import { QuizLevel } from "models/Quiz.model";

interface GetLevelStringProps {
  quizLevel: QuizLevel;
}

export const getQuizLevelString = ({ quizLevel }: GetLevelStringProps): string => {
  return {
    beginner: "débutant",
    intermediate: "intermédiaire",
    expert: "expert",
  }[quizLevel];
};
