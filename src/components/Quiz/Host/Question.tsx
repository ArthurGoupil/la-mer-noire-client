import React from "react";
import styled from "styled-components";

import FullWidthContainer from "components/Utils/FullWidthContainer";
import { QuizItem } from "models/Quiz.model";
import EStyles from "constants/Styling.constants";

interface QuestionDisplayProps {
  quizItem: QuizItem;
  showAnswers?: boolean;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  quizItem,
  showAnswers = true,
}): JSX.Element => {
  return (
    <FullWidthContainer className="d-flex flex-column align-center">
      <QuestionContainer>{quizItem.question}</QuestionContainer>
      {showAnswers && (
        <>
          <FullWidthContainer className="d-flex justify-center">
            <AnswerContainer color={EStyles.darkBlue}>
              {quizItem.choices[0]}
            </AnswerContainer>
            <AnswerContainer color={EStyles.yellow}>
              {quizItem.choices[1]}
            </AnswerContainer>
          </FullWidthContainer>
          <FullWidthContainer className="d-flex justify-center">
            <AnswerContainer color={EStyles.orange}>
              {quizItem.choices[2]}
            </AnswerContainer>
            <AnswerContainer color={EStyles.turquoise}>
              {quizItem.choices[3]}
            </AnswerContainer>
          </FullWidthContainer>
        </>
      )}
    </FullWidthContainer>
  );
};

const QuestionContainer = styled.div`
  font-size: 30px;
  line-height: 35px;
  padding: 10px;
  border-radius: ${EStyles.radius};
  text-align: center;
  margin-bottom: 10px;
`;
const AnswerContainer = styled.div<{ color: string }>`
  min-width: 30%;
  text-align: center;
  font-weight: bold;
  padding: 20px;
  margin: 10px;
  border-radius: ${EStyles.miniRadius};
  background-color: ${(props) => props.color};
  text-shadow: 2px 2px 0px ${EStyles.darkBlue};
`;

export default QuestionDisplay;
