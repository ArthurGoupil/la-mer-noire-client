import React from "react";
import styled from "styled-components";

import { FullWidthContainer } from "components/Utils/FullWidthContainer";
import { QuizItem, QuizLevel } from "models/Quiz.model";
import { getQuizLevelColor } from "utils/quiz/getQuizLevelColor.util";

interface QuestionDisplayProps {
  quizItem: QuizItem;
  quizLevel: QuizLevel;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  quizItem,
  quizLevel,
}): JSX.Element => {
  return (
    <FullWidthContainer className="d-flex align-start" margin="0 0 10px 0">
      <QuizLevelTag backgroundColor={getQuizLevelColor({ quizLevel })} />
      <QuestionContainer>{quizItem.question}</QuestionContainer>
    </FullWidthContainer>
  );
};

const QuizLevelTag = styled.div<{ backgroundColor: string }>`
  width: 35px;
  height: 25px;
  background-color: ${(props) => props.backgroundColor};
  margin: 18px 10px 0 0;
  border-radius: 5px;
`;

const QuestionContainer = styled.div`
  font-size: 30px;
  line-height: 35px;
  border-radius: 10px;
  text-align: center;
  margin: 10px 0 20px 0;
`;
