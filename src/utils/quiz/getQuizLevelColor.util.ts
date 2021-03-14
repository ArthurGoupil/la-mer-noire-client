import { Styles } from "constants/Styling.constants";
import { QuizLevel } from "models/Quiz.model";

interface GetQuizLevelColorProps {
  quizLevel: QuizLevel;
}

export const getQuizLevelColor = ({ quizLevel }: GetQuizLevelColorProps): string => {
  return {
    beginner: Styles.turquoise,
    intermediate: Styles.yellow,
    expert: Styles.red,
  }[quizLevel];
};
