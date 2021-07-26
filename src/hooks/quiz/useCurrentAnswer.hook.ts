import React from "react";
import { useMutation } from "@apollo/client";

import { CookieName } from "constants/Cookies.constants";
import { CurrentAnswer } from "models/Game.model";
import { GIVE_ANSWER } from "services/games.service";
import { getCookie, setCookie } from "utils/cookies.util";
import { AnswerType } from "constants/AnswerType.constants";

interface UseCurrentAnswerReturn {
  currentAnswer: CurrentAnswer | null;
  setCurrentAnswer: (props: SetCurrentAnswerProps) => void;
}

interface UseCurrentAnswerProps {
  shortId: string;
  quizItemSignature: string;
  answerCallback?: () => void;
}

export interface SetCurrentAnswerProps {
  answer: string;
  answerType: AnswerType;
  playerId: string;
  correctAnswer?: string;
}

export const useCurrentAnswer = ({
  shortId,
  quizItemSignature,
  answerCallback,
}: UseCurrentAnswerProps): UseCurrentAnswerReturn => {
  const [giveAnswer] = useMutation(GIVE_ANSWER);

  const [currentAnswer, setCurrentAnswerState] = React.useState<CurrentAnswer | null>(
    getCookie<CurrentAnswer>({
      prefix: shortId,
      cookieName: CookieName.currentAnswer,
    }),
  );

  const setCurrentAnswer = ({
    answer,
    answerType,
    playerId,
    correctAnswer,
  }: SetCurrentAnswerProps): void => {
    setCurrentAnswerState({ quizItemSignature, answer, answerType });
    setCookie<CurrentAnswer | null>({
      prefix: shortId,
      cookieName: CookieName.currentAnswer,
      cookieValue: { quizItemSignature, answer, answerType },
    });
    giveAnswer({
      variables: {
        shortId,
        playerId,
        quizItemSignature,
        answer,
        answerType,
        correctAnswer,
      },
    });
    if (answerCallback) {
      answerCallback();
    }
  };

  return { currentAnswer, setCurrentAnswer };
};
