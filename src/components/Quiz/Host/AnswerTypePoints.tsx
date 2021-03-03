import React from "react";
import styled from "styled-components";

import { ECaPasseOuCaCashPoints } from "constants/CaPasseOuCaCash.constants";
import { EStyles } from "constants/Styling.constants";
import { QuizLevel } from "models/Quiz.model";
import { getQuizLevelColor } from "utils/quiz/getQuizLevelColor.util";
import { FullWidthContainer } from "components/Utils/FullWidthContainer";

interface AnswerTypePointsProps {
  quizLevel: QuizLevel;
}

export const AnswerTypePoints: React.FC<AnswerTypePointsProps> = ({ quizLevel }): JSX.Element => {
  const levelColor = getQuizLevelColor({ quizLevel });
  return (
    <FullWidthContainer className="d-flex  align-end">
      <AnswerTypePointsContainer className="d-flex">
        DUO
        <PointsNumber color={levelColor}>{ECaPasseOuCaCashPoints[quizLevel].duo}</PointsNumber>
      </AnswerTypePointsContainer>
      <AnswerTypePointsContainer className="d-flex">
        CARRÉ
        <PointsNumber color={levelColor}>{ECaPasseOuCaCashPoints[quizLevel].carre}</PointsNumber>
      </AnswerTypePointsContainer>
      <AnswerTypePointsContainer className="d-flex">
        CASH
        <PointsNumber color={levelColor}>{ECaPasseOuCaCashPoints[quizLevel].cash}</PointsNumber>
      </AnswerTypePointsContainer>
    </FullWidthContainer>
  );
};

const AnswerTypePointsContainer = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  line-height: 30px;
  color: ${EStyles.lightBlue};
  margin-left: 10px;
`;

const PointsNumber = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  margin-left: 3px;
`;
