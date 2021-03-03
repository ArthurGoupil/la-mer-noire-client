import { EStyles } from "constants/Styling.constants";
import { QuizLevel } from "models/Quiz.model";

interface GetWavesBackgroundGradientProps {
  quizLevel: QuizLevel;
}

export const getWavesBackgroundGradient = ({ quizLevel }: GetWavesBackgroundGradientProps) => {
  return {
    beginner: [EStyles.turquoise, EStyles.lightBlue],
    intermediate: [EStyles.yellow, EStyles.orange],
    expert: [EStyles.red, EStyles.redOrange],
  }[quizLevel];
};
