import removeAccents from "remove-accents";

interface IsValidAnswerProps {
  answer: string;
  givenAnswer: string;
}

const isValidAnswer = ({
  answer,
  givenAnswer,
}: IsValidAnswerProps): boolean => {
  const formattedAnswer = removeAccents(answer)
    .replace(/\s/g, "")
    .toLowerCase();
  const formattedGivenAnswer = removeAccents(givenAnswer)
    .replace(/\s/g, "")
    .toLowerCase();

  if (formattedAnswer === formattedGivenAnswer) {
    return true;
  }

  return false;
};

export default isValidAnswer;
