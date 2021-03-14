import React from "react";
import styled from "styled-components";

import { CaPasseOuCaCashPoints } from "constants/CaPasseOuCaCash.constants";
import { Styles } from "constants/Styling.constants";
import { QuizLevel } from "models/Quiz.model";
import { getQuizLevelColor } from "utils/quiz/getQuizLevelColor.util";
import { getAnswerTypeColor } from "utils/quiz/getAnswerTypeColor.util";
import { AnswerType } from "constants/AnswerType.constants";

interface AnswerTypePointsProps {
  quizLevel: QuizLevel;
}

export const AnswerTypePoints: React.FC<AnswerTypePointsProps> = ({ quizLevel }): JSX.Element => {
  const levelColor = getQuizLevelColor({ quizLevel });
  return (
    <div className="d-flex">
      <AnswerTypePointsContainer
        backgroundColor={getAnswerTypeColor({ answerType: AnswerType.duo })}
        className="d-flex align-center"
      >
        DUO
        <PointsNumber color={levelColor} className="d-flex justify-center align-center">
          {CaPasseOuCaCashPoints[quizLevel].duo}
        </PointsNumber>
      </AnswerTypePointsContainer>
      <AnswerTypePointsContainer
        backgroundColor={getAnswerTypeColor({ answerType: AnswerType.carre })}
        className="d-flex align-center"
      >
        CARRÉ
        <PointsNumber color={levelColor} className="d-flex justify-center align-center">
          {CaPasseOuCaCashPoints[quizLevel].carre}
        </PointsNumber>
      </AnswerTypePointsContainer>
      <AnswerTypePointsContainer
        backgroundColor={getAnswerTypeColor({ answerType: AnswerType.cash })}
        noMarginRight
        className="d-flex align-center"
      >
        CASH
        <PointsNumber color={levelColor} className="d-flex justify-center align-center">
          {CaPasseOuCaCashPoints[quizLevel].cash}
        </PointsNumber>
      </AnswerTypePointsContainer>
    </div>
  );
};

const AnswerTypePointsContainer = styled.span<{ backgroundColor: string; noMarginRight?: boolean }>`
  font-family: "Boogaloo", cursive;
  font-size: 32px;
  line-height: 32px;
  margin-right: ${(props) => (props.noMarginRight ? 0 : "15px")};
  background-color: ${(props) => props.backgroundColor};
  padding: 10px 10px;
  border-radius: 5px;
  text-shadow: 3px 2px 0px ${Styles.darkBlue};
`;

const PointsNumber = styled.div<{ color: string }>`
  min-width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${Styles.darkBlue};
  color: ${(props) => props.color};
  margin-left: 10px;
  padding: 0 12px 2px 10px;
`;
