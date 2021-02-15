import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { AnswerType } from "models/Game.model";
import { useCurrentAnswer } from "hooks/quiz/useCurrentAnswer.hook";

interface AnswerChoiceProps {
  color: string;
  quizAnswer: string;
  shortId: string;
  quizId: string;
  answerType: AnswerType;
  playerId: string;
  questionIsOver: boolean;
}

export const AnswerChoice: React.FC<AnswerChoiceProps> = ({
  color,
  quizAnswer,
  shortId,
  quizId,
  answerType,
  playerId,
  questionIsOver,
}): JSX.Element => {
  const { currentAnswer, setCurrentAnswer } = useCurrentAnswer({
    shortId,
    quizId,
  });

  const answerIsSelected =
    currentAnswer?.answer === quizAnswer && currentAnswer?.quizId === quizId;

  const anotherAnswerIsSelected =
    (currentAnswer !== null &&
      currentAnswer?.answer !== quizAnswer &&
      currentAnswer?.quizId === quizId) ||
    (!answerIsSelected && questionIsOver);

  return (
    <AnswerButton
      disabled={anotherAnswerIsSelected}
      className="d-flex justify-center align-center"
      color={color}
      answerIsSelected={answerIsSelected}
      anotherAnswerIsSelected={anotherAnswerIsSelected}
      onClick={async () => {
        if (currentAnswer?.quizId !== quizId) {
          setCurrentAnswer({ answer: quizAnswer, answerType, playerId });
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
  border-radius: ${EStyles.miniRadius};
  box-sizing: border-box;
  outline: none;
  border: none;
  opacity: ${(props) => (props.anotherAnswerIsSelected ? 0.6 : 1)};
  box-shadow: ${(props) =>
    props.answerIsSelected ? `inset 0 0 10px 5px white` : "none"};
`;
