import React from "react";
import styled from "styled-components";

import { AnswerTypeChoice } from "models/Game.model";
import EStyles from "constants/Styling.constants";
import FullHeightContainer from "components/Utils/FullHeightContainer";

interface AnswerTypeSelectionProps {
  quizId: string;
  setAnswerTypeChoice: React.Dispatch<React.SetStateAction<AnswerTypeChoice>>;
}

const AnswerTypeSelection: React.FC<AnswerTypeSelectionProps> = ({
  quizId,
  setAnswerTypeChoice,
}): JSX.Element => {
  return (
    <FullHeightContainer
      minHeight="100%"
      padding="0"
      className="d-flex flex-column align-center flex-grow"
    >
      <AnswerTypeContainer
        className="d-flex justify-center align-center"
        backgroundColor={EStyles.lightBlue}
        onClick={() => setAnswerTypeChoice({ quizId, answerType: "duo" })}
      >
        DUO
      </AnswerTypeContainer>
      <AnswerTypeContainer
        className="d-flex justify-center align-center"
        backgroundColor={EStyles.yellow}
        onClick={() => setAnswerTypeChoice({ quizId, answerType: "carre" })}
      >
        CARRÉ
      </AnswerTypeContainer>
      <AnswerTypeContainer
        className="d-flex justify-center align-center"
        backgroundColor={EStyles.orange}
        onClick={() => setAnswerTypeChoice({ quizId, answerType: "cash" })}
      >
        CASH
      </AnswerTypeContainer>
    </FullHeightContainer>
  );
};

const AnswerTypeContainer = styled.div<{ backgroundColor: string }>`
  width: 100%;
  flex: 1;
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  text-shadow: 3px 3px 0px ${EStyles.darkBlue};
  background-color: ${(props) => props.backgroundColor};
  margin: 10px;
  border-radius: 10px;
`;

export default AnswerTypeSelection;
