import { EStyles } from "constants/Styling.constants";
import { QuestionNumber } from "./getQuizLevelByQuestionNumber.util";

interface GetQuestionNumberColorProps {
  questionNumber: QuestionNumber;
}

export const getQuestionNumberColor = ({ questionNumber }: GetQuestionNumberColorProps): string => {
  return questionNumber < 4 ? EStyles.turquoise : questionNumber < 7 ? EStyles.yellow : EStyles.red;
};
