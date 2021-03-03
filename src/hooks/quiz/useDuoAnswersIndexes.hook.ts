import React from "react";

import { DuoAnswersIndexes, QuizItemData } from "models/Quiz.model";
import { getCookie, setCookie } from "utils/cookies.util";
import { ECookieName } from "constants/Cookies.constants";
import { getRandomDuoAnswersIndexes } from "utils/quiz/getRandomDuoAnswersIndexes.util";

interface UseDuoAnswersIndexesProps {
  shortId: string;
  quizItemData: QuizItemData;
}

interface UseDuoAnswersIndexesReturn {
  duoAnswersIndexes: DuoAnswersIndexes;
}

export const useDuoAnswersIndexes = ({
  shortId,
  quizItemData,
}: UseDuoAnswersIndexesProps): UseDuoAnswersIndexesReturn => {
  const [duoAnswersIndexes, setDuoAnswersIndexes] = React.useState<DuoAnswersIndexes>(
    getCookie({
      prefix: shortId,
      cookieName: ECookieName.duoAnswersIndexes,
    }),
  );
  React.useEffect(() => {
    if (quizItemData) {
      if (duoAnswersIndexes?.quizItemSignature !== quizItemData.quizItemSignature) {
        const duoAnswersIndexesToStore = {
          quizItemSignature: quizItemData.quizItemSignature,
          indexes: getRandomDuoAnswersIndexes({
            choices: quizItemData.quiz.choices,
            answer: quizItemData.quiz.answer,
          }),
        };
        setDuoAnswersIndexes(duoAnswersIndexesToStore);
        setCookie({
          prefix: shortId,
          cookieName: ECookieName.duoAnswersIndexes,
          cookieValue: duoAnswersIndexesToStore,
        });
      }
    }
  }, [quizItemData, duoAnswersIndexes?.quizItemSignature, shortId]);

  return { duoAnswersIndexes };
};
