import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { AnswerType, CurrentAnswer } from "models/Game.model";
import { SetCurrentAnswerProps } from "hooks/quiz/useCurrentAnswer.hook";

interface AnswerChoiceProps {
  color: string;
  quizAnswer: string;
  quizItemSignature: string;
  answerType: AnswerType;
  playerId: string;
  currentAnswer: CurrentAnswer | null;
  onClick: (value: SetCurrentAnswerProps) => Promise<void>;
  questionIsOver: boolean;
}

export const AnswerChoice: React.FC<AnswerChoiceProps> = ({
  color,
  quizAnswer,
  quizItemSignature,
  answerType,
  playerId,
  currentAnswer,
  onClick,
  questionIsOver,
}): JSX.Element => {
  const answerIsSelected =
    currentAnswer?.answer === quizAnswer && currentAnswer?.quizItemSignature === quizItemSignature;

  const anotherAnswerIsSelected =
    (currentAnswer !== null &&
      currentAnswer?.answer !== quizAnswer &&
      currentAnswer?.quizItemSignature === quizItemSignature) ||
    (!answerIsSelected && questionIsOver);

  return (
    <AnswerButton
      disabled={anotherAnswerIsSelected}
      className="d-flex justify-center align-center"
      color={color}
      answerIsSelected={answerIsSelected}
      anotherAnswerIsSelected={anotherAnswerIsSelected}
      onClick={async () => {
        if (currentAnswer?.quizItemSignature !== quizItemSignature) {
          await onClick({ answer: quizAnswer, answerType, playerId });
        }
      }}
    >
      {quizAnswer}
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
  text-shadow: 2px 2px 0px ${EStyles.darkBlue};
  font-weight: bold;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
  border: none;
  opacity: ${(props) => (props.anotherAnswerIsSelected ? 0.6 : 1)};
  box-shadow: ${(props) => (props.answerIsSelected ? `inset 0 0 10px 5px white` : "none")};
`;
