import { EStyles } from "constants/Styling.constants";
import { QuizLevel } from "models/Quiz.model";

interface GetQuizLevelColorProps {
  quizLevel: QuizLevel;
}

export const getQuizLevelColor = ({ quizLevel }: GetQuizLevelColorProps): string => {
  return {
    beginner: EStyles.turquoise,
    intermediate: EStyles.yellow,
    expert: EStyles.red,
  }[quizLevel];
};
