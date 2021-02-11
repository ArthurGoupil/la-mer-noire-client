import { AnswerType } from "models/Game.model";

interface GetStringFromAnswerTypeProps {
  answerType: AnswerType;
}

const getStringFromAnswerType = ({
  answerType,
}: GetStringFromAnswerTypeProps): string => {
  switch (answerType) {
    case "duo":
      return "DUO";
    case "carre":
      return "CARRÉ";
    case "cash":
      return "CASH";
  }
};

export default getStringFromAnswerType;
