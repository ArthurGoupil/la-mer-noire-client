import removeAccents from "remove-accents";

interface IsValidAnswerProps {
  answer: string;
  givenAnswer: string;
}

export const isValidAnswer = ({ answer, givenAnswer }: IsValidAnswerProps): boolean => {
  if (answer && givenAnswer) {
    const formattedAnswer = removeAccents(answer).replace(/\s/g, "").toLowerCase();
    const formattedGivenAnswer = removeAccents(givenAnswer).replace(/\s/g, "").toLowerCase();

    if (formattedAnswer === formattedGivenAnswer) {
      return true;
    }
  }
  return false;
};
