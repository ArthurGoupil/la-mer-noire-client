import { QuizItemLevel } from "models/Quiz.model";

interface GetLevelStringProps {
  level: QuizItemLevel;
}

export const getLevelString = ({ level }: GetLevelStringProps) => {
  return {
    beginner: "débutant",
    intermediate: "intermédiaire",
    expert: "expert",
  }[level];
};
