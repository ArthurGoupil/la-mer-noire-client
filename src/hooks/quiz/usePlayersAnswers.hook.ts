import React from "react";
import { useSubscription } from "@apollo/client";

import { PLAYER_ANSWERED } from "services/games.service";
import { getCookie, setCookie } from "utils/cookies.util";
import { Answer, PlayerData } from "models/Game.model";
import { CookieName } from "constants/Cookies.constants";
import { isValidAnswer } from "utils/quiz/isValidAnswer.util";
import { useSound } from "hooks/others/useSound.hook";
import { PlayerSounds } from "constants/Sounds.constants";

interface UsePlayersAnswersProps {
  shortId: string;
  quizItemSignature: string;
  players: PlayerData[];
  quizAnswer: string;
  playerId?: string;
}

interface UsePlayersAnswersReturn {
  playersAnswers: Record<string, Answer>;
  allPlayersHaveAnswered: boolean;
}

export const usePlayersAnswers = ({
  shortId,
  quizItemSignature,
  players,
  quizAnswer,
  playerId,
}: UsePlayersAnswersProps): UsePlayersAnswersReturn => {
  const { data: { playerAnswered } = {} } = useSubscription(PLAYER_ANSWERED, {
    variables: { shortId },
  });

  const { play: playFirstCash } = useSound({ sound: PlayerSounds.firstCash });
  const { play: playCash } = useSound({ sound: PlayerSounds.cash });
  const { play: playCarre } = useSound({ sound: PlayerSounds.carre });
  const { play: playDuo } = useSound({ sound: PlayerSounds.duo });
  const { play: playWrong } = useSound({ sound: PlayerSounds.wrong });

  const [playersAnswers, setPlayersAnswers] = React.useState<Record<string, Answer>>(
    getCookie({
      prefix: shortId,
      cookieName: CookieName.playersAnswers,
    }) || {},
  );

  const [allPlayersHaveAnswered, setAllPlayersHaveAnswered] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (quizItemSignature && Object.keys(playersAnswers).length > 0) {
      if (Object.values(playersAnswers)[0]?.quizItemSignature !== quizItemSignature) {
        setPlayersAnswers({});
        setCookie<Record<string, Answer>>({
          prefix: shortId,
          cookieName: CookieName.playersAnswers,
          cookieValue: {},
        });
        setAllPlayersHaveAnswered(false);
      }
    }
  }, [quizItemSignature, playersAnswers, shortId]);

  React.useEffect(() => {
    if (
      quizItemSignature &&
      playerAnswered?.quizItemSignature === quizItemSignature &&
      playerAnswered?.answerType !== "buzz" &&
      !playersAnswers[playerAnswered?.playerId] &&
      Object.keys(playersAnswers).length !== players.length
    ) {
      if (
        playersAnswers[playerAnswered.playerId]?.quizItemSignature !== quizItemSignature &&
        playerAnswered?.quizItemSignature === quizItemSignature
      ) {
        const isGoodAnswer = isValidAnswer({
          answer: quizAnswer,
          givenAnswer: playerAnswered.answer,
          givenAnswerType: playerAnswered.answerType,
        });

        let isFirstGoodCash;
        if (playerAnswered.answerType === "cash" && isGoodAnswer) {
          isFirstGoodCash = Object.keys(playersAnswers).reduce((isFirstGoodCashAcc, playerId) => {
            return (
              isFirstGoodCashAcc &&
              !(
                playersAnswers[playerId].answerType === "cash" &&
                playersAnswers[playerId].isGoodAnswer
              )
            );
          }, true);
        } else {
          isFirstGoodCash = false;
        }

        playersAnswers[playerAnswered.playerId] = {
          quizItemSignature,
          answer: playerAnswered.answer,
          answerType: playerAnswered.answerType,
          isGoodAnswer: isValidAnswer({
            answer: quizAnswer,
            givenAnswer: playerAnswered.answer,
            givenAnswerType: playerAnswered.answerType,
          }),
          isFirstGoodCash,
        };

        if (playerId && playerId === playerAnswered.playerId) {

          if (playersAnswers[playerId].isGoodAnswer) {

            if (isFirstGoodCash) {
              playFirstCash();
            } else if (playersAnswers[playerId].answerType === "cash") {
              playCash();
            } else if (playersAnswers[playerId].answerType === "carre") {
              playCarre();
            } else if (playersAnswers[playerId].answerType === "duo") {
              playDuo();
            }
          } else {
            playWrong();
          }
        }
      }

      if (
        Object.keys(playersAnswers).length === players.length &&
        playerAnswered?.quizItemSignature === quizItemSignature
      ) {
        setAllPlayersHaveAnswered(true);
      }

      setPlayersAnswers({ ...playersAnswers });
      setCookie<Record<string, Answer>>({
        prefix: shortId,
        cookieName: CookieName.playersAnswers,
        cookieValue: playersAnswers,
      });
    }
  }, [
    playerAnswered,
    quizItemSignature,
    players,
    shortId,
    playersAnswers,
    quizAnswer,
    playerId,
    playFirstCash,
    playCash,
    playCarre,
    playDuo,
    playWrong,
  ]);

  return { playersAnswers, allPlayersHaveAnswered };
};
