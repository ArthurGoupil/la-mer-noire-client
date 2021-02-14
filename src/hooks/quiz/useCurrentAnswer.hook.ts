import React from "react";
import { useMutation } from "@apollo/client";

import ECookieName from "constants/Cookies.constants";
import { Answer, AnswerType } from "models/Game.model";
import { GIVE_ANSWER } from "services/games.service";
import { getCookie, setCookie } from "utils/cookies.util";

interface UseCurrentAnswerReturn {
  currentAnswer: Answer | null;
  setCurrentAnswer: (props: SetCurrentAnswerProps) => Promise<void>;
}

interface UseCurrentAnswerProps {
  shortId: string;
  quizId: string;
}

interface SetCurrentAnswerProps {
  answer: string;
  answerType: AnswerType;
  playerId: string;
}

const useCurrentAnswer = ({
  shortId,
  quizId,
}: UseCurrentAnswerProps): UseCurrentAnswerReturn => {
  const [giveAnswer] = useMutation(GIVE_ANSWER);

  const [currentAnswer, setCurrentAnswerState] = React.useState<Answer | null>(
    getCookie<Answer>({
      prefix: shortId,
      cookieName: ECookieName.currentAnswer,
    }),
  );

  React.useEffect(() => {
    if (quizId) {
      if (currentAnswer && currentAnswer?.quizId !== quizId) {
        setCurrentAnswerState(null);
      }
    }
  }, [quizId]);

  const setCurrentAnswer = async ({
    answer,
    answerType,
    playerId,
  }: SetCurrentAnswerProps): Promise<void> => {
    setCurrentAnswerState({ quizId, answer, answerType });
    setCookie({
      prefix: shortId,
      cookieName: ECookieName.currentAnswer,
      cookieValue: { quizId, answer, answerType },
    });
    await giveAnswer({
      variables: {
        shortId,
        playerId,
        answer,
        answerType,
      },
    });
  };

  return { currentAnswer, setCurrentAnswer };
};

export default useCurrentAnswer;