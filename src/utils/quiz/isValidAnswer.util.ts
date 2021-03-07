import { AnswerType } from "models/Game.model";
import removeAccents from "remove-accents";

interface IsValidAnswerProps {
  answer: string;
  givenAnswer: string;
  givenAnswerType: AnswerType;
}

export const isValidAnswer = ({
  answer,
  givenAnswer,
  givenAnswerType,
}: IsValidAnswerProps): boolean => {
  if (answer && givenAnswer) {
    const formattedAnswer = removeAccents(answer).replace(/\s/g, "").toLowerCase();
    const formattedGivenAnswer = removeAccents(givenAnswer).replace(/\s/g, "").toLowerCase();

    if (formattedAnswer === formattedGivenAnswer) {
      return true;
    }

    if (formattedAnswer.length > 5 && givenAnswerType === "cash") {
      let wrongLetters = 0;

      for (let i = 0; i < formattedAnswer.length; i++) {
        if (formattedAnswer[i] !== formattedGivenAnswer[i]) {
          wrongLetters += 1;
          if (wrongLetters > formattedAnswer.length / 5 || !isNaN(parseInt(formattedAnswer[i]))) {
            return false;
          }
        }
      }

      return true;
    }
  }

  return false;
};
