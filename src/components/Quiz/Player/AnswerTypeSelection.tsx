import React from "react";
import styled from "styled-components";

import { AnswerTypeChoice } from "models/Game.model";
import { Styles } from "constants/Styling.constants";
import { FullHeightLayout } from "components/Utils/FullHeightLayout";
import { useWindowHeight } from "hooks/others/useWindowHeight.hook";
import { AnswerType } from "constants/AnswerType.constants";

interface AnswerTypeSelectionProps {
  quizItemSignature: string;
  questionIsOver: boolean;
  setAnswerTypeChoice: React.Dispatch<React.SetStateAction<AnswerTypeChoice>>;
}

export const AnswerTypeSelection: React.FC<AnswerTypeSelectionProps> = ({
  quizItemSignature,
  questionIsOver,
  setAnswerTypeChoice,
}): JSX.Element => {
  const { height } = useWindowHeight();

  return (
    <FullHeightLayout
      padding="0"
      height={`${height}px`}
      className="d-flex flex-column align-center flex-grow"
    >
      <AnswerTypeContainer
        disabled={questionIsOver}
        className="d-flex justify-center align-center"
        backgroundColor={Styles.lightBlue}
        opacity={questionIsOver ? 0.6 : 1}
        onClick={() => setAnswerTypeChoice({ quizItemSignature, answerType: AnswerType.duo })}
      >
        DUO
      </AnswerTypeContainer>
      <AnswerTypeContainer
        disabled={questionIsOver}
        className="d-flex justify-center align-center"
        backgroundColor={Styles.yellow}
        opacity={questionIsOver ? 0.6 : 1}
        onClick={() => setAnswerTypeChoice({ quizItemSignature, answerType: AnswerType.carre })}
      >
        CARRÉ
      </AnswerTypeContainer>
      <AnswerTypeContainer
        disabled={questionIsOver}
        className="d-flex justify-center align-center"
        backgroundColor={Styles.red}
        opacity={questionIsOver ? 0.6 : 1}
        onClick={() => setAnswerTypeChoice({ quizItemSignature, answerType: AnswerType.cash })}
      >
        CASH
      </AnswerTypeContainer>
    </FullHeightLayout>
  );
};

const AnswerTypeContainer = styled.button<{
  backgroundColor: string;
  opacity: number;
}>`
  width: 100%;
  height: calc(100% / 3 - 80px / 3);
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  text-shadow: 3px 3px 0px ${Styles.darkBlue};
  background-color: ${(props) => props.backgroundColor};
  margin: 10px;
  border-radius: 10px;
  opacity: ${(props) => props.opacity};
  border: none;
`;
