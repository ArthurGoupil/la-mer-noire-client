import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { QuizLevel } from "models/Quiz.model";
import { getLevelString } from "utils/quiz/getLevelString.util";
import { AnswerTypePoints } from "./AnswerTypePoints";
import { QuestionNumber } from "utils/quiz/getLevelByQuestionNumber.util";
import { getQuestionNumberColor } from "utils/quiz/getQuestionNumberColor.util";
import { getQuizLevelColor } from "utils/quiz/getQuizLevelColor.util";

interface QuizInfosScreenProps {
  questionNumber: QuestionNumber;
  quizLevel: QuizLevel;
}

export const QuizInfosScreen: React.FC<QuizInfosScreenProps> = ({
  questionNumber,
  quizLevel,
}): JSX.Element => {
  return (
    <div className="d-flex flex-column align-center justify-center">
      <QuestionNumberContainer>
        QUESTION{" "}
        <Number color={getQuestionNumberColor({ questionNumber })}>{questionNumber}</Number> SUR 9
      </QuestionNumberContainer>
      <Separator />
      <QuestionLevelContainer>
        NIVEAU{" "}
        <QuestionLevel color={getQuizLevelColor({ quizLevel })}>
          {getLevelString({ quizLevel }).toUpperCase()}
        </QuestionLevel>
      </QuestionLevelContainer>
      <Separator />
      <PointsContainer className="d-flex">
        <AnswerTypePoints quizLevel={quizLevel} />
      </PointsContainer>
    </div>
  );
};

const Separator = styled.div`
  width: 200px;
  height: 5px;
  background-color: ${EStyles.redOrange};
  border-radius: 5px;
  margin: 30px 0;
`;

const QuestionNumberContainer = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 70px;
  line-height: 70px;
  color: ${EStyles.darkBlue};
  font-style: italic;
`;

const Number = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  text-shadow: 5px 5px 0 ${EStyles.darkBlue};
`;

const QuestionLevelContainer = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 70px;
  line-height: 70px;
  color: ${EStyles.darkBlue};
  font-style: italic;
`;

const QuestionLevel = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  text-shadow: 5px 5px 0 ${EStyles.darkBlue};
`;

const PointsContainer = styled.div`
  background-color: ${EStyles.darkBlue};
  border-radius: 10px;
  padding: 10px 15px;
`;
