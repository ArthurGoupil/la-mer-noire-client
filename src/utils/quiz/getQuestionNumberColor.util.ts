import { Styles } from "constants/Styling.constants";
import { QuestionNumber } from "./getQuizLevelByQuestionNumber.util";

interface GetQuestionNumberColorProps {
  questionNumber: QuestionNumber;
}

export const getQuestionNumberColor = ({ questionNumber }: GetQuestionNumberColorProps): string => {
  return questionNumber < 4 ? Styles.turquoise : questionNumber < 7 ? Styles.yellow : Styles.red;
};
