import React from "react";
import { useSubscription } from "@apollo/client";

import { PLAYER_ANSWERED } from "services/games.service";
import { getCookie, setCookie } from "utils/cookies.util";
import { Answer } from "models/Game.model";
import ECookieName from "constants/Cookies.constants";
import { QuizItemData } from "models/Quiz.model";

interface UseGetAnswersProps {
  shortId: string;
  quizItemData: QuizItemData;
}

const useGetAnswers = ({
  shortId,
  quizItemData,
}: UseGetAnswersProps): Record<string, Answer> => {
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

  React.useEffect(() => {
    if (playerAnswered && quizItemData) {
      const playerId = playerAnswered.playerId;
      if (playersAnswers[playerId]?.quizId !== quizItemData.quizId) {
        playersAnswers[playerId] = {
          quizId: quizItemData.quizId,
          answer: playerAnswered.answer,
          answerType: playerAnswered.answerType,
        };
      }
      setPlayersAnswers({ ...playersAnswers });
      setCookie({
        prefix: shortId,
        cookieName: ECookieName.playersAnswers,
        cookieValue: playersAnswers,
      });
    }
  }, [playerAnswered]);

  return playersAnswers;
};

export default useGetAnswers;
