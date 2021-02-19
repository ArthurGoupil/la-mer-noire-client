import React from "react";
import styled from "styled-components";

import { getLevelString } from "utils/quiz/getLevelString.util";
import { ECaPasseOuCaCashPoints } from "constants/CaPasseOuCaCashPoints.constants";
import { EStyles } from "constants/Styling.constants";
import { QuizItemLevel } from "models/Quiz.model";

interface LevelAndAnswerTypePointsProps {
  level: QuizItemLevel;
}

export const LevelAndAnswerTypePoints: React.FC<LevelAndAnswerTypePointsProps> = ({
  level,
}): JSX.Element => {
  return (
    <>
      <QuestionLevel
        color={
          {
            beginner: EStyles.turquoise,
            intermediate: EStyles.yellow,
            expert: EStyles.redOrange,
          }[level]
        }
      >
        {getLevelString({ level }).toUpperCase()}
      </QuestionLevel>
      <AnswerTypePoints className="d-flex">
        DUO
        <PointsNumber>{ECaPasseOuCaCashPoints[level].duo}</PointsNumber>
      </AnswerTypePoints>
      <AnswerTypePoints className="d-flex">
        CARRÉ
        <PointsNumber>{ECaPasseOuCaCashPoints[level].carre}</PointsNumber>
      </AnswerTypePoints>
      <AnswerTypePoints className="d-flex">
        CASH
        <PointsNumber>{ECaPasseOuCaCashPoints[level].cash}</PointsNumber>
      </AnswerTypePoints>
    </>
  );
};

const QuestionLevel = styled.div<{ color: string }>`
  font-family: "Boogaloo", cursive;
  font-size: 25px;
  line-height: 22px;
  color: ${(props) => props.color};
`;

const AnswerTypePoints = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 17px;
  color: ${EStyles.lightBlue};
  line-height: 17px;
  margin-left: 10px;
`;

const PointsNumber = styled.div`
  color: ${EStyles.turquoise};
  margin-left: 3px;
`;
