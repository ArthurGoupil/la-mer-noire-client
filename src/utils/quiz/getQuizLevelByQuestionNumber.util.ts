import { QuizLevel } from "models/Quiz.model";

interface GetLevelByQuestionNumberProps {
  questionNumber: QuestionNumber;
}

export type QuestionNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const getQuizLevelByQuestionNumber = ({
  questionNumber,
}: GetLevelByQuestionNumberProps): QuizLevel => {
  return {
    1: "beginner",
    2: "beginner",
    3: "beginner",
    4: "intermediate",
    5: "intermediate",
    6: "intermediate",
    7: "expert",
    8: "expert",
    9: "expert",
  }[questionNumber] as QuizLevel;
};
