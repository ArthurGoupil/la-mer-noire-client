import React from "react";

import { ECaPasseOuCaCashPoints } from "constants/CaPasseOuCaCashPoints.constants";
import { Answer } from "models/Game.model";
import { QuizItemLevel } from "models/Quiz.model";
import { isValidAnswer } from "../../utils/quiz/isValidAnswer.util";

interface UseCaPasseOuCaCashQuestionSummaryProps {
  previousPlayersPoints: Record<string, number>;
  playersAnswers: Record<string, Answer>;
  quizAnswer: string;
  quizLevel: QuizItemLevel;
  questionIsOver: boolean;
}

export type PlayerSummary = {
  answer: string;
  additionalPoints: number;
  totalPoints: number;
};

interface UseCaPasseOuCaCashQuestionSummaryReturn {
  questionSummary: Record<string, PlayerSummary> | null;
}

export const useCaPasseOuCaCashQuestionSummary = ({
  previousPlayersPoints,
  playersAnswers,
  quizAnswer,
  quizLevel,
  questionIsOver,
}: UseCaPasseOuCaCashQuestionSummaryProps): UseCaPasseOuCaCashQuestionSummaryReturn => {
  const [questionSummary, setQuestionSummary] = React.useState<Record<
    string,
    PlayerSummary
  > | null>(null);

  React.useEffect(() => {
    if (questionIsOver) {
      const newQuestionSummary: Record<string, PlayerSummary> = {};
      for (let playerId of Object.keys(previousPlayersPoints)) {
        const additionalPoints = isValidAnswer({
          answer: quizAnswer,
          givenAnswer: playersAnswers[playerId]?.answer,
        })
          ? ECaPasseOuCaCashPoints[quizLevel][
              playersAnswers[playerId].answerType
            ]
          : 0;

        newQuestionSummary[playerId] = {
          answer: playersAnswers[playerId]?.answer,
          additionalPoints,
          totalPoints: additionalPoints + previousPlayersPoints[playerId],
        };
      }

      setQuestionSummary(newQuestionSummary);
    }
  }, [questionIsOver]);

  return { questionSummary };
};
