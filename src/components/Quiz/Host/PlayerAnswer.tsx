import React from "react";
import styled from "styled-components";

import { AnswerType } from "models/Game.model";
import { EStyles } from "constants/Styling.constants";
import { getStringFromAnswerType } from "utils/quiz/getStringFromAnswerType";
import { FullWidthContainer } from "components/Utils/FullWidthContainer";

interface PlayerAnswerProps {
  playerName: string;
  answerType: AnswerType;
  isGoodAnswer: boolean;
  noMarginRight: boolean;
  questionIsOver: boolean;
}

export const PlayerAnswer: React.FC<PlayerAnswerProps> = ({
  playerName,
  answerType,
  isGoodAnswer,
  noMarginRight,
  questionIsOver,
}): JSX.Element => {
  const answerTypeString = getStringFromAnswerType({ answerType });

  return (
    <PlayerAnswerContainer className="d-flex flex-column " noMarginRight={noMarginRight}>
      <InnerShadow />
      <div>{playerName}</div>
      <FullWidthContainer>
        <AnswerTypeContainer
          className="d-flex justify-center align-center"
          color={answerTypeString || questionIsOver ? EStyles.darkBlue : "white"}
          backgroundColor={
            answerTypeString
              ? isGoodAnswer
                ? "SpringGreen"
                : "Tomato"
              : !questionIsOver
              ? EStyles.darkBlue
              : "Tomato"
          }
          fontSize={answerTypeString ? "18px" : "12px"}
        >
          {answerTypeString || (questionIsOver ? "TOO LATE !" : "EN ATTENTE")}
        </AnswerTypeContainer>
      </FullWidthContainer>
    </PlayerAnswerContainer>
  );
};

const PlayerAnswerContainer = styled.div<{ noMarginRight: boolean }>`
  background-color: ${EStyles.darken_blue};
  padding: 15px;
  margin-bottom: 10px;
  margin-right: ${(props) => (props.noMarginRight ? 0 : "20px")};
  border-radius: 10px;
  font-weight: 500;
  max-width: 160px;
  white-space: nowrap;
  text-align: center;
  overflow: hidden;
  position: relative;
  z-index: 0;
`;

const InnerShadow = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: -20px 0px 15px ${EStyles.darken_blue} inset;
  z-index: 1;
`;

const AnswerTypeContainer = styled.div<{
  color: string;
  backgroundColor: string;
  fontSize: string;
}>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-family: "Boogaloo", cursive;
  width: 80px;
  height: 40px;
  background-color: ${(props) => props.backgroundColor};
  margin-top: 10px;
  border-radius: 50px;
  font-weight: 400;
  z-index: 2;
`;
