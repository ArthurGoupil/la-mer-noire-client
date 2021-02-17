import React from "react";
import { useSubscription } from "@apollo/client";

import { PLAYER_ANSWERED } from "services/games.service";
import { getCookie, setCookie } from "utils/cookies.util";
import { Answer, PlayerData } from "models/Game.model";
import { ECookieName } from "constants/Cookies.constants";
import { QuizItemData } from "models/Quiz.model";

interface UsePlayersAnswersProps {
  shortId: string;
  quizItemData: QuizItemData;
  players: PlayerData[];
  isGeneratingNewCurrentQuizItem?: boolean;
}

interface UsePlayersAnswersReturn {
  playersAnswers: Record<string, Answer>;
  allPlayersHaveAnswered: boolean;
}

export const usePlayersAnswers = ({
  shortId,
  quizItemData,
  players,
  isGeneratingNewCurrentQuizItem,
}: UsePlayersAnswersProps): UsePlayersAnswersReturn => {
  const { data: { playerAnswered } = {} } = useSubscription(PLAYER_ANSWERED, {
    variables: { shortId },
  });

  const [playersAnswers, setPlayersAnswers] = React.useState<
    Record<string, Answer>
  >(
    getCookie({
      prefix: shortId,
      cookieName: ECookieName.playersAnswers,
    }) || {},
  );

  const [
    allPlayersHaveAnswered,
    setAllPlayersHaveAnswered,
  ] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isGeneratingNewCurrentQuizItem) {
      setAllPlayersHaveAnswered(false);
    }
  }, [isGeneratingNewCurrentQuizItem]);

  React.useEffect(() => {
    if (quizItemData) {
      if (Object.values(playersAnswers)[0]?.quizId !== quizItemData.quizId) {
        setPlayersAnswers({});
        setCookie({
          prefix: shortId,
          cookieName: ECookieName.playersAnswers,
          cookieValue: {},
        });
        if (!isGeneratingNewCurrentQuizItem) {
          setAllPlayersHaveAnswered(false);
        }
      }
    }
  }, [quizItemData]);

  React.useEffect(() => {
    if (
      playerAnswered &&
      quizItemData &&
      Object.keys(playersAnswers).length !== players.length
    ) {
      const playerId = playerAnswered.playerId;
      if (playersAnswers[playerId]?.quizId !== quizItemData.quizId) {
        playersAnswers[playerId] = {
          quizId: quizItemData.quizId,
          answer: playerAnswered.answer,
          answerType: playerAnswered.answerType,
        };
      }
      if (Object.keys(playersAnswers).length === players.length) {
        setAllPlayersHaveAnswered(true);
      }
      setPlayersAnswers({ ...playersAnswers });
      setCookie({
        prefix: shortId,
        cookieName: ECookieName.playersAnswers,
        cookieValue: playersAnswers,
      });
    }
  }, [playerAnswered]);

  return { playersAnswers, allPlayersHaveAnswered };
};
