import { EStyles } from "constants/Styling.constants";
import { QuizLevel } from "models/Quiz.model";

interface GetLevelGradientProps {
  quizLevel: QuizLevel;
}

export const getLevelGradient = ({ quizLevel }: GetLevelGradientProps): string[] => {
  return {
    beginner: [EStyles.turquoise, EStyles.lightBlue],
    intermediate: [EStyles.yellow, EStyles.orange],
    expert: [EStyles.red, EStyles.redOrange],
  }[quizLevel];
};
