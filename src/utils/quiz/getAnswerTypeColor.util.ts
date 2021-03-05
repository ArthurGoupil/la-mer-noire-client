import { EStyles } from "constants/Styling.constants";
import { AnswerType } from "models/Game.model";

interface GetAnswerTypeColorProps {
  answerType: AnswerType;
}

export const getAnswerTypeColor = ({ answerType }: GetAnswerTypeColorProps): string => {
  return {
    duo: EStyles.turquoise,
    carre: EStyles.yellow,
    cash: EStyles.red,
  }[answerType];
};
