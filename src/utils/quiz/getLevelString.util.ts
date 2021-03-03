import { QuizLevel } from "models/Quiz.model";

interface GetLevelStringProps {
  quizLevel: QuizLevel;
}

export const getLevelString = ({ quizLevel }: GetLevelStringProps) => {
  return {
    beginner: "débutant",
    intermediate: "intermédiaire",
    expert: "expert",
  }[quizLevel];
};
