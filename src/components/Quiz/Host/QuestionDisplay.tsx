import React from "react";
import styled from "styled-components";

import { FullWidthContainer } from "components/Utils/FullWidthContainer";
import { QuizItem } from "models/Quiz.model";

interface QuestionDisplayProps {
  quizItem: QuizItem;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ quizItem }): JSX.Element => {
  return (
    <FullWidthContainer className="d-flex flex-column align-center" margin="0 0 10px 0">
      <QuestionContainer>{quizItem.question}</QuestionContainer>
    </FullWidthContainer>
  );
};

const QuestionContainer = styled.div`
  font-size: 30px;
  line-height: 35px;
  border-radius: 10px;
  text-align: center;
  margin: 10px 0 20px 0;
`;
