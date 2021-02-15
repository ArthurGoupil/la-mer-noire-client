import { AnswerType } from "models/Game.model";

interface GetStringFromAnswerTypeProps {
  answerType: AnswerType;
}

export const getStringFromAnswerType = ({
  answerType,
}: GetStringFromAnswerTypeProps): string | undefined => {
  switch (answerType) {
    case "duo":
      return "DUO";
    case "carre":
      return "CARRÉ";
    case "cash":
      return "CASH";
  }
};
