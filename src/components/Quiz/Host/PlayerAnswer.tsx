import React from "react";
import styled from "styled-components";

import { AnswerType } from "models/Game.model";
import EStyles from "constants/Styling.constants";
import getStringFromAnswerType from "utils/Quiz/getStringFromAnswerType";

interface PlayerAnswerProps {
  playerName: string;
  answerType: AnswerType;
  isGoodAnswer: boolean;
  noMarginRight: boolean;
}

const PlayerAnswer: React.FC<PlayerAnswerProps> = ({
  playerName,
  answerType,
  isGoodAnswer,
  noMarginRight,
}): JSX.Element => {
  const answerTypeString = getStringFromAnswerType({ answerType });

  return (
    <PlayerAnswerContainer
      className="d-flex flex-column align-center"
      noMarginRight={noMarginRight}
    >
      <div>{playerName}</div>
      <AnswerTypeContainer
        className="d-flex justify-center align-center"
        color={answerTypeString ? EStyles.darkBlue : "white"}
        backgroundColor={
          answerTypeString
            ? isGoodAnswer
              ? "SpringGreen"
              : "Tomato"
            : EStyles.darkBlue
        }
        fontSize={answerTypeString ? "18px" : "12px"}
      >
        {answerTypeString || "EN ATTENTE"}
      </AnswerTypeContainer>
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
`;

export default PlayerAnswer;
