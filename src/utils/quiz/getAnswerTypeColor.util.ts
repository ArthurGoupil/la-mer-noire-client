import { AnswerType } from "constants/AnswerType.constants";
import { Styles } from "constants/Styling.constants";

interface GetAnswerTypeColorProps {
  answerType: AnswerType;
}

export const getAnswerTypeColor = ({ answerType }: GetAnswerTypeColorProps): string => {
  return {
    duo: Styles.turquoise,
    carre: Styles.yellow,
    cash: Styles.red,
  }[answerType];
};
