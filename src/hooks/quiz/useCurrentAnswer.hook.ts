import React from "react";
import { useMutation } from "@apollo/client";

import { ECookieName } from "constants/Cookies.constants";
import { AnswerType, CurrentAnswer } from "models/Game.model";
import { GIVE_ANSWER } from "services/games.service";
import { getCookie, setCookie } from "utils/cookies.util";

interface UseCurrentAnswerReturn {
  currentAnswer: CurrentAnswer | null;
  setCurrentAnswer: (props: SetCurrentAnswerProps) => Promise<void>;
}

interface UseCurrentAnswerProps {
  shortId: string;
  quizItemSignature: string;
}

export interface SetCurrentAnswerProps {
  answer: string;
  answerType: AnswerType;
  playerId: string;
}

export const useCurrentAnswer = ({
  shortId,
  quizItemSignature,
}: UseCurrentAnswerProps): UseCurrentAnswerReturn => {
  const [giveAnswer] = useMutation(GIVE_ANSWER);

  const [currentAnswer, setCurrentAnswerState] = React.useState<CurrentAnswer | null>(
    getCookie<CurrentAnswer>({
      prefix: shortId,
      cookieName: ECookieName.currentAnswer,
    }),
  );

  const setCurrentAnswer = async ({
    answer,
    answerType,
    playerId,
  }: SetCurrentAnswerProps): Promise<void> => {
    setCurrentAnswerState({ quizItemSignature, answer, answerType });
    setCookie<CurrentAnswer | null>({
      prefix: shortId,
      cookieName: ECookieName.currentAnswer,
      cookieValue: { quizItemSignature, answer, answerType },
    });
    await giveAnswer({
      variables: {
        shortId,
        playerId,
        quizItemSignature,
        answer,
        answerType,
      },
    });
  };

  return { currentAnswer, setCurrentAnswer };
};
