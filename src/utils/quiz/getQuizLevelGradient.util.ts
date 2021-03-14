import { Styles } from "constants/Styling.constants";
import { QuizLevel } from "models/Quiz.model";

interface GetLevelGradientProps {
  quizLevel: QuizLevel;
}

export const getQuizLevelGradient = ({ quizLevel }: GetLevelGradientProps): string[] => {
  return {
    beginner: [Styles.turquoise, Styles.lightBlue],
    intermediate: [Styles.yellow, Styles.orange],
    expert: [Styles.red, Styles.redOrange],
  }[quizLevel];
};
