import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";
import { CurrentAnswer } from "models/Game.model";
import { SetCurrentAnswerProps } from "hooks/quiz/useCurrentAnswer.hook";
import { AnswerType } from "constants/AnswerType.constants";

interface AnswerChoiceProps {
  color: string;
  choice: string;
  quizItemSignature: string;
  answerType: AnswerType;
  playerId: string;
  currentAnswer: CurrentAnswer | null;
  onClick: (value: SetCurrentAnswerProps) => void;
  playerCanAnswer: boolean;
  correctAnswer?: string;
}

export const AnswerChoice: React.FC<AnswerChoiceProps> = ({
  color,
  choice,
  quizItemSignature,
  answerType,
  playerId,
  currentAnswer,
  onClick,
  playerCanAnswer,
  correctAnswer,
}): JSX.Element => {
  const answerIsSelected =
    currentAnswer?.answer === choice && currentAnswer?.quizItemSignature === quizItemSignature;

  const anotherAnswerIsSelected =
    (currentAnswer !== null &&
      currentAnswer?.answer !== choice &&
      currentAnswer?.quizItemSignature === quizItemSignature) ||
    (!answerIsSelected && !playerCanAnswer);

  return (
    <AnswerButton
      disabled={anotherAnswerIsSelected}
      className="d-flex justify-center align-center"
      color={color}
      answerIsSelected={answerIsSelected}
      anotherAnswerIsSelected={anotherAnswerIsSelected}
      onClick={() => {
        if (currentAnswer?.quizItemSignature !== quizItemSignature) {
          onClick({ answer: choice, answerType, playerId, correctAnswer });
        }
      }}
    >
      {choice}
    </AnswerButton>
  );
};

const AnswerButton = styled.button<{
  color: string;
  answerIsSelected: boolean;
  anotherAnswerIsSelected: boolean;
}>`
  width: 100%;
  flex: 1;
  margin: 10px 0;
  text-shadow: 2px 2px 0px ${Styles.darkBlue};
  font-weight: bold;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
  border: none;
  opacity: ${(props) => (props.anotherAnswerIsSelected ? 0.6 : 1)};
  box-shadow: ${(props) => (props.answerIsSelected ? `inset 0 0 10px 5px white` : "none")};
`;
