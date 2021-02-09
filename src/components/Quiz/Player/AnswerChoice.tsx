import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";
import useCookie from "hooks/useCookie";
import ECookieName from "constants/Cookies.constants";
import { Answer } from "models/Game";
import setAnswer from "utils/Game/setAnswer.utils";

interface AnswerChoiceProps {
  color: string;
  answer: string;
  shortId: string;
  quizId: string;
  playerId: string;
  selectedAnswer: Answer | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
}

const AnswerChoice: React.FC<AnswerChoiceProps> = ({
  color,
  answer,
  shortId,
  quizId,
  playerId,
  selectedAnswer,
  setSelectedAnswer,
}): JSX.Element => {
  const currentAnswer = useCookie<Answer>({
    prefix: shortId,
    cookieName: ECookieName.currentAnswer,
  });

  const handleSetAnswer = setAnswer({
    shortId,
    quizId,
    answer,
    playerId,
    setSelectedAnswer,
  });

  React.useEffect(() => {
    if (currentAnswer?.quizId === quizId) {
      setSelectedAnswer(currentAnswer);
    }
  }, []);

  return (
    <AnswerContainer
      className="d-flex justify-center align-center"
      color={color}
      answerIsSelected={
        selectedAnswer?.answer === answer && selectedAnswer?.quizId === quizId
      }
      anotherAnswerIsSelected={
        selectedAnswer !== null &&
        selectedAnswer?.answer !== answer &&
        selectedAnswer?.quizId === quizId
      }
      onClick={async () => {
        if (!selectedAnswer && currentAnswer?.quizId !== quizId) {
          handleSetAnswer();
        }
      }}
    >
      {answer}
    </AnswerContainer>
  );
};

const AnswerContainer = styled.button<{
  color: string;
  answerIsSelected: boolean;
  anotherAnswerIsSelected: boolean;
}>`
  width: calc(100% - 20px);
  height: 100%;
  margin: 10px;
  color: white;
  text-shadow: 2px 2px 0px ${EStyles.darkBlue};
  font-weight: bold;
  background-color: ${(props) => props.color};
  border-radius: ${EStyles.miniRadius};
  box-sizing: border-box;
  outline: none;
  border: none;
  opacity: ${(props) => (props.anotherAnswerIsSelected ? 0.6 : 1)};
  box-shadow: ${(props) =>
    props.answerIsSelected ? `inset 0 0 10px 5px white` : "none"};
`;

export default AnswerChoice;
