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
  isFirstCash: boolean;
  noMarginRight: boolean;
  questionIsOver: boolean;
}

export const PlayerAnswer: React.FC<PlayerAnswerProps> = ({
  playerName,
  answerType,
  isGoodAnswer,
  isFirstCash,
  noMarginRight,
  questionIsOver,
}): JSX.Element => {
  const answerTypeString = getStringFromAnswerType({ answerType });

  const answerBackgroundColor = answerTypeString
    ? isGoodAnswer
      ? EStyles.good
      : EStyles.wrong
    : !questionIsOver
    ? EStyles.darkBlue
    : EStyles.wrong;

  return (
    <PlayerAnswerContainer className="d-flex flex-column " noMarginRight={noMarginRight}>
      <InnerShadow />
      <div>{playerName.toUpperCase()}</div>
      <FullWidthContainer>
        <AnswerTypeContainer
          className="d-flex justify-center align-center"
          color={answerTypeString || questionIsOver ? EStyles.darkBlue : "white"}
          backgroundColor={answerBackgroundColor}
          fontSize={answerTypeString ? "18px" : "12px"}
        >
          {answerTypeString || (questionIsOver ? "TOO LATE !" : "EN ATTENTE")}
          {isGoodAnswer && isFirstCash && <FirstCash src="/icons/cash-first.svg" />}
        </AnswerTypeContainer>
      </FullWidthContainer>
    </PlayerAnswerContainer>
  );
};

const PlayerAnswerContainer = styled.div<{ noMarginRight: boolean }>`
  max-width: 150px;
  font-family: "Boogaloo", cursive;
  background-color: ${EStyles.darken_blue};
  padding: 15px;
  margin-bottom: 20px;
  margin-right: ${(props) => (props.noMarginRight ? 0 : "20px")};
  border-radius: 10px;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
  overflow: hidden;
  position: relative;
  z-index: 0;
  font-size: 17px;
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
  width: 80px;
  height: 40px;
  background-color: ${(props) => props.backgroundColor};
  margin-top: 10px;
  border-radius: 50px;
  font-weight: 400;
  z-index: 2;
`;

const FirstCash = styled.img`
  height: 22px;
  margin-left: 4px;
`;
