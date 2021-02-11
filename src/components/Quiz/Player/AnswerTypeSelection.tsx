import React from "react";

import { AnswerTypeChoice } from "models/Game.model";
import styled from "styled-components";
import EStyles from "constants/Styling.constants";

interface AnswerTypeSelectionProps {
  quizId: string;
  setAnswerTypeChoice: React.Dispatch<React.SetStateAction<AnswerTypeChoice>>;
}

const AnswerTypeSelection: React.FC<AnswerTypeSelectionProps> = ({
  quizId,
  setAnswerTypeChoice,
}): JSX.Element => {
  return (
    <div className="d-flex flex-column flex-grow">
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
    </div>
  );
};

const AnswerTypeContainer = styled.div<{ backgroundColor: string }>`
  height: 100%;
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  text-shadow: 3px 3px 0px ${EStyles.darkBlue};
  background-color: ${(props) => props.backgroundColor};
  margin: 10px;
  border-radius: 10px;
`;

export default AnswerTypeSelection;
