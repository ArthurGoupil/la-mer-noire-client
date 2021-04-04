import { QuizStage } from "constants/GameStage.constants";
import { QuizLevel } from "models/Quiz.model";

interface GetLevelByQuestionNumberProps {
  stage: QuizStage;
  questionNumber: number;
}

export const getQuizLevelByQuestionNumber = ({
  stage,
  questionNumber,
}: GetLevelByQuestionNumberProps): QuizLevel => {
  switch (stage) {
    case QuizStage.caPasseOuCaCash:
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
    case QuizStage.kidimieux:
      return {
        1: "beginner",
        2: "beginner",
        3: "intermediate",
        4: "intermediate",
        5: "intermediate",
        6: "expert",
        7: "expert",
        8: "expert",
        9: "expert",
      }[questionNumber] as QuizLevel;
  }
};
