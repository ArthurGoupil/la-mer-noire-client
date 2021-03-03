import React from "react";
import { QuizItemData } from "models/Quiz.model";

interface UseNonNullQuizItemDataProps {
  quizItemData: QuizItemData;
}

interface UseNonNullQuizItemDataReturn {
  nonNullQuizItemData: QuizItemData;
}

export const useNonNullQuizItemData = ({
  quizItemData,
}: UseNonNullQuizItemDataProps): UseNonNullQuizItemDataReturn => {
  const [nonNullQuizItemData, setNonNullQuizItemData] = React.useState<QuizItemData>(
    quizItemData || {
      quizItemSignature: null,
      category: { name: "" },
      theme: "",
      subTheme: "",
      level: "",
      quiz: {
        quizItemId: -1,
        question: "",
        choices: ["", "", "", ""],
        answer: "",
      },
    },
  );

  React.useEffect(() => {
    if (quizItemData) {
      setNonNullQuizItemData(quizItemData);
    }
  }, [quizItemData]);

  return { nonNullQuizItemData };
};
