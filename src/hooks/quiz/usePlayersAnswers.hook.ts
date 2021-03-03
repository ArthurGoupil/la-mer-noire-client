import React from "react";
import { useSubscription } from "@apollo/client";

import { PLAYER_ANSWERED } from "services/games.service";
import { getCookie, setCookie } from "utils/cookies.util";
import { Answer, PlayerData } from "models/Game.model";
import { ECookieName } from "constants/Cookies.constants";

interface UsePlayersAnswersProps {
  shortId: string;
  quizItemSignature: string;
  players: PlayerData[];
}

interface UsePlayersAnswersReturn {
  playersAnswers: Record<string, Answer>;
  allPlayersHaveAnswered: boolean;
}

export const usePlayersAnswers = ({
  shortId,
  quizItemSignature,
  players,
}: UsePlayersAnswersProps): UsePlayersAnswersReturn => {
  const { data: { playerAnswered } = {} } = useSubscription(PLAYER_ANSWERED, {
    variables: { shortId },
  });

  const [playersAnswers, setPlayersAnswers] = React.useState<Record<string, Answer>>(
    getCookie({
      prefix: shortId,
      cookieName: ECookieName.playersAnswers,
    }) || {},
  );

  const [allPlayersHaveAnswered, setAllPlayersHaveAnswered] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (quizItemSignature && Object.keys(playersAnswers).length > 0) {
      if (Object.values(playersAnswers)[0]?.quizItemSignature !== quizItemSignature) {
        setPlayersAnswers({});
        setCookie({
          prefix: shortId,
          cookieName: ECookieName.playersAnswers,
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
      Object.keys(playersAnswers).length !== players.length
    ) {
      const playerId = playerAnswered.playerId;
      if (
        playersAnswers[playerId]?.quizItemSignature !== quizItemSignature &&
        playerAnswered?.quizItemSignature === quizItemSignature
      ) {
        playersAnswers[playerId] = {
          quizItemSignature,
          answer: playerAnswered.answer,
          answerType: playerAnswered.answerType,
        };
      }

      if (
        Object.keys(playersAnswers).length === players.length &&
        playerAnswered?.quizItemSignature === quizItemSignature
      ) {
        setAllPlayersHaveAnswered(true);
      }

      setPlayersAnswers({ ...playersAnswers });
      setCookie({
        prefix: shortId,
        cookieName: ECookieName.playersAnswers,
        cookieValue: playersAnswers,
      });
    }
  }, [playerAnswered, playersAnswers, quizItemSignature, players, shortId]);

  return { playersAnswers, allPlayersHaveAnswered };
};
