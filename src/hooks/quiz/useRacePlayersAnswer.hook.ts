import React from "react";
import { useSubscription } from "@apollo/client";

import { PLAYER_ANSWERED } from "services/games.service";
import { PlayerData, PlayerAnswersSummary } from "models/Game.model";
import { isValidAnswer } from "utils/quiz/isValidAnswer.util";
import { AnswerType } from "constants/AnswerType.constants";
import { getCookie, setCookie } from "utils/cookies.util";
import { CookieName } from "constants/Cookies.constants";

interface UseRacePlayersAnswersProps {
  shortId: string;
  players: PlayerData[];
}

interface UseRacePlayersAnswersReturn {
  racePlayersAnswers: Record<string, PlayerAnswersSummary>;
  playersRanking: string[];
  raceIsOver: boolean;
}

export const useRacePlayersAnswers = ({
  shortId,
  players,
}: UseRacePlayersAnswersProps): UseRacePlayersAnswersReturn => {
  const { data: { playerAnswered } = {} } = useSubscription(PLAYER_ANSWERED, {
    variables: { shortId },
  });

  const racePlayersAnswersInit: Record<string, PlayerAnswersSummary> = React.useMemo(
    () => ({}),
    [],
  );
  players.forEach(
    (playerData) =>
      (racePlayersAnswersInit[playerData.player._id] = {
        answers: 0,
        goodAnswers: 0,
        answersFactor: 0,
        doneQuizItemSignatures: [],
      }),
  );

  const [playersRanking, setPlayersRanking] = React.useState<string[]>(
    getCookie({ prefix: shortId, cookieName: CookieName.scubaRanking }) || [],
  );

  const [racePlayersAnswers, setPlayersAnswers] = React.useState<
    Record<string, PlayerAnswersSummary>
  >(
    getCookie({ prefix: shortId, cookieName: CookieName.racePlayersAnswers }) ||
      racePlayersAnswersInit,
  );

  const [raceIsOver, setRaceIsOver] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (
      playerAnswered?.playerId &&
      !racePlayersAnswers[playerAnswered.playerId].doneQuizItemSignatures.includes(
        playerAnswered.quizItemSignature,
      )
    ) {
      racePlayersAnswers[playerAnswered.playerId].answers += 1;
      racePlayersAnswers[playerAnswered.playerId].doneQuizItemSignatures.push(
        playerAnswered.quizItemSignature,
      );

      if (
        isValidAnswer({
          correctAnswer: playerAnswered.correctAnswer,
          givenAnswer: playerAnswered.answer,
          givenAnswerType: AnswerType.carre,
        })
      ) {
        racePlayersAnswers[playerAnswered.playerId].goodAnswers += 1;
        if (racePlayersAnswers[playerAnswered.playerId].answersFactor < 8.5) {
          racePlayersAnswers[playerAnswered.playerId].answersFactor += 1;
        } else if (racePlayersAnswers[playerAnswered.playerId].answersFactor < 10) {
          racePlayersAnswers[playerAnswered.playerId].answersFactor = 10;
          playersRanking.push(playerAnswered.playerId);
          setCookie({
            prefix: shortId,
            cookieName: CookieName.scubaRanking,
            cookieValue: playersRanking,
          });
          if (playersRanking.length === 3) {
            setRaceIsOver(true);
          }
          setPlayersRanking([...playersRanking]);
        }
      } else if (racePlayersAnswers[playerAnswered.playerId].answersFactor > 0) {
        racePlayersAnswers[playerAnswered.playerId].answersFactor =
          Math.round((racePlayersAnswers[playerAnswered.playerId].answersFactor - 0.2) * 10) / 10;
      }

      setPlayersAnswers({ ...racePlayersAnswers });
      setCookie({
        prefix: shortId,
        cookieName: CookieName.racePlayersAnswers,
        cookieValue: racePlayersAnswers,
      });

      if (
        Object.keys(racePlayersAnswers).every(
          (playerId) => racePlayersAnswers[playerId].answers === 30,
        )
      ) {
        setRaceIsOver(true);
      }
    }
  }, [playerAnswered, playersRanking, racePlayersAnswers, shortId]);

  return { racePlayersAnswers, playersRanking, raceIsOver };
};
