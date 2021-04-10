import React from "react";
import styled from "styled-components";

import { AnswerTypeChoice } from "models/Game.model";
import { Styles } from "constants/Styling.constants";
import { useWindowHeight } from "hooks/others/useWindowHeight.hook";
import { AnswerType } from "constants/AnswerType.constants";

interface AnswerTypeSelectionProps {
  quizItemSignature: string;
  playerCanAnswer: boolean;
  setAnswerTypeChoice: React.Dispatch<React.SetStateAction<AnswerTypeChoice>>;
  isBuzz?: boolean;
  selectedAnswerType?: AnswerType | null;
  disableDuo?: boolean;
  disableCarre?: boolean;
}

export const AnswerTypeSelection: React.FC<AnswerTypeSelectionProps> = ({
  quizItemSignature,
  playerCanAnswer,
  setAnswerTypeChoice,
  isBuzz = false,
  selectedAnswerType = null,
  disableDuo = false,
  disableCarre = false,
}): JSX.Element => {
  const { height } = useWindowHeight();

  const duoIsDisabled =
    !playerCanAnswer || (selectedAnswerType !== null && selectedAnswerType !== "duo") || disableDuo;
  const carreIsDisabled =
    !playerCanAnswer ||
    (selectedAnswerType !== null && selectedAnswerType !== "carre") ||
    disableCarre;
  const cashIsDisabled =
    !playerCanAnswer || (selectedAnswerType !== null && selectedAnswerType !== "cash");

  const duoOpacity = duoIsDisabled && selectedAnswerType !== "duo" ? 0.6 : 1;
  const carreOpacity = carreIsDisabled && selectedAnswerType !== "carre" ? 0.6 : 1;
  const cashOpacity = cashIsDisabled && selectedAnswerType !== "cash" ? 0.6 : 1;

  return (
    <AnswerTypeSelectionContainer
      height={height}
      className="d-flex flex-column align-center justify-center"
    >
      <AnswerTypeContainer
        disabled={duoIsDisabled}
        className="d-flex justify-center align-center"
        backgroundColor={Styles.lightBlue}
        opacity={duoOpacity}
        onClick={() => setAnswerTypeChoice({ quizItemSignature, answerType: AnswerType.duo })}
        selected={selectedAnswerType === "duo"}
      >
        {isBuzz ? "BUZZ DUO" : "DUO"}
      </AnswerTypeContainer>
      <AnswerTypeContainer
        disabled={carreIsDisabled}
        className="d-flex justify-center align-center"
        backgroundColor={Styles.yellow}
        opacity={carreOpacity}
        onClick={() => setAnswerTypeChoice({ quizItemSignature, answerType: AnswerType.carre })}
        selected={selectedAnswerType === "carre"}
      >
        {isBuzz ? "BUZZ CARRÉ" : "CARRÉ"}
      </AnswerTypeContainer>
      <AnswerTypeContainer
        disabled={cashIsDisabled}
        className="d-flex justify-center align-center"
        backgroundColor={Styles.red}
        opacity={cashOpacity}
        onClick={() => setAnswerTypeChoice({ quizItemSignature, answerType: AnswerType.cash })}
        selected={selectedAnswerType === "cash"}
      >
        {isBuzz ? "BUZZ CASH" : "CASH"}
      </AnswerTypeContainer>
    </AnswerTypeSelectionContainer>
  );
};

const AnswerTypeSelectionContainer = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  width: 100%;
  padding: 0px 20px;
  position: absolute;
  top: 0;
`;

const AnswerTypeContainer = styled.button<{
  backgroundColor: string;
  opacity: number;
  selected: boolean;
}>`
  width: 100%;
  height: calc((100% / 3) - (80px / 3));
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  text-shadow: 3px 3px 0px ${Styles.darkBlue};
  background-color: ${(props) => props.backgroundColor};
  margin: 10px;
  border-radius: 10px;
  opacity: ${(props) => props.opacity};
  border: none;
  box-shadow: ${(props) => (props.selected ? `inset 0 0 10px 5px white` : "none")};
`;
