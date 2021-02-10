import EStyles from "constants/Styling.constants";
import React from "react";
import styled from "styled-components";

const PlayerAnswer: React.FC<{}> = (): JSX.Element => {
  return (
    <PlayerAnswerContainer className="d-flex flex-column align-center">
      <div style={{ color: "white" }}>Arthur</div>
      <AnswerTypeContainer className="d-flex justify-center align-center">
        CASH
      </AnswerTypeContainer>
    </PlayerAnswerContainer>
  );
};

const PlayerAnswerContainer = styled.div`
  background-color: ${EStyles.darken_blue};
  padding: 10px;
  border-radius: 10px;
  font-weight: 500;
`;

const AnswerTypeContainer = styled.div`
  font-family: "Boogaloo", cursive;

  width: 100px;
  height: 50px;
  background-color: SpringGreen;
  margin-top: 10px;
  padding: 10px;
  border-radius: 50px;
  font-weight: 400;
  color: ${EStyles.darkBlue};
`;

export default PlayerAnswer;
