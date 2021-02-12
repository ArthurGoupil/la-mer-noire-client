import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";
import ECookieName from "constants/Cookies.constants";
import { Answer, AnswerType } from "models/Game.model";
import { getCookie } from "utils/cookies.util";
import useSetAnswer from "hooks/useSetAnswer.hook";

interface AnswerChoiceProps {
  color: string;
  quizAnswer: string;
  shortId: string;
  quizId: string;
  answerType: AnswerType;
  playerId: string;
  questionIsOver: boolean;
  selectedAnswer: Answer | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
}

const AnswerChoice: React.FC<AnswerChoiceProps> = ({
  color,
  quizAnswer,
  shortId,
  quizId,
  answerType,
  playerId,
  questionIsOver,
  selectedAnswer,
  setSelectedAnswer,
}): JSX.Element => {
  const currentAnswer = getCookie<Answer>({
    prefix: shortId,
    cookieName: ECookieName.currentAnswer,
  });

  const setAnswer = useSetAnswer();

  React.useEffect(() => {
    if (currentAnswer?.quizId === quizId) {
      setSelectedAnswer(currentAnswer);
    }
  }, []);

  const answerIsSelected =
    selectedAnswer?.answer === quizAnswer && selectedAnswer?.quizId === quizId;

  const anotherAnswerIsSelected =
    (selectedAnswer !== null &&
      selectedAnswer?.answer !== quizAnswer &&
      selectedAnswer?.quizId === quizId) ||
    questionIsOver;

  return (
    <AnswerButton
      disabled={anotherAnswerIsSelected}
      className="d-flex justify-center align-center"
      color={color}
      answerIsSelected={answerIsSelected}
      anotherAnswerIsSelected={anotherAnswerIsSelected}
      onClick={async () => {
        if (!selectedAnswer && currentAnswer?.quizId !== quizId) {
          setAnswer({
            shortId,
            quizId,
            answer: quizAnswer,
            answerType,
            playerId,
            setSelectedAnswer,
          });
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

export default AnswerChoice;
