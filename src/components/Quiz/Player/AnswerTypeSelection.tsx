import React from "react";
import styled from "styled-components";

import { AnswerType, AnswerTypeChoice } from "models/Game.model";
import { EStyles } from "constants/Styling.constants";
import { FullHeightContainer } from "components/Utils/FullHeightContainer";

interface AnswerTypeSelectionProps {
  quizId: string;
  questionIsOver: boolean;
  setAnswerTypeChoice: React.Dispatch<React.SetStateAction<AnswerTypeChoice>>;
}

export const AnswerTypeSelection: React.FC<AnswerTypeSelectionProps> = ({
  quizId,
  questionIsOver,
  setAnswerTypeChoice,
}): JSX.Element => {
  return (
    <FullHeightContainer
      minHeight="100%"
      padding="0"
      className="d-flex flex-column align-center flex-grow"
    >
      <AnswerTypeContainer
        disabled={questionIsOver}
        className="d-flex justify-center align-center"
        backgroundColor={EStyles.lightBlue}
        opacity={questionIsOver ? 0.6 : 1}
        onClick={() =>
          setAnswerTypeChoice({ quizId, answerType: AnswerType.duo })
        }
      >
        DUO
      </AnswerTypeContainer>
      <AnswerTypeContainer
        disabled={questionIsOver}
        className="d-flex justify-center align-center"
        backgroundColor={EStyles.yellow}
        opacity={questionIsOver ? 0.6 : 1}
        onClick={() =>
          setAnswerTypeChoice({ quizId, answerType: AnswerType.carre })
        }
      >
        CARRÉ
      </AnswerTypeContainer>
      <AnswerTypeContainer
        disabled={questionIsOver}
        className="d-flex justify-center align-center"
        backgroundColor={EStyles.redOrange}
        opacity={questionIsOver ? 0.6 : 1}
        onClick={() =>
          setAnswerTypeChoice({ quizId, answerType: AnswerType.cash })
        }
      >
        CASH
      </AnswerTypeContainer>
    </FullHeightContainer>
  );
};

const AnswerTypeContainer = styled.button<{
  backgroundColor: string;
  opacity: number;
}>`
  width: 100%;
  flex: 1;
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  text-shadow: 3px 3px 0px ${EStyles.darkBlue};
  background-color: ${(props) => props.backgroundColor};
  margin: 10px;
  border-radius: 10px;
  opacity: ${(props) => props.opacity};
  border: none;
`;
