import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";

interface GameCodeBlocProps {
  gameCode: string;
}

export const GameCodeBloc: React.FC<GameCodeBlocProps> = ({ gameCode }): JSX.Element => {
  return (
    <GameCodeBlocContainer className="d-flex flex-column align-center justify-center">
      <GameCodeContainer className="d-flex justify-center align-center">
        <GameCodeStroke>{gameCode}</GameCodeStroke>
        <GameCode className="d-flex align-center">
          <SmartphoneIcon src="/icons/phone-quiz.svg" />
          {gameCode}
        </GameCode>
      </GameCodeContainer>
      <CodeText>
        Rendez-vous sur <LMNUrl>lamernoire.fun</LMNUrl> pour rejoindre la partie.
      </CodeText>
    </GameCodeBlocContainer>
  );
};

const GameCodeBlocContainer = styled.div`
  border-radius: 30px;
  padding: 20px;
  border: 5px solid ${Styles.blue};
`;

const GameCodeContainer = styled.span`
  height: 60px;
  margin-bottom: 20px;
`;

const SmartphoneIcon = styled.img`
  height: 50px;
  margin-top: 5px;
  margin-right: 20px;
`;

const CodeText = styled.div`
  font-size: 16px;
  text-align: center;
`;

const LMNUrl = styled.span`
  font-weight: bold;
`;

const GameCode = styled.div`
  font-family: "Boogaloo", cursive;
  color: ${Styles.redOrange};
  font-size: 60px;
  line-height: 60px;
  font-weight: bold;
  position: absolute;
`;

const GameCodeStroke = styled(GameCode)`
  position: absolute;
  -webkit-text-stroke: 10px ${Styles.turquoise};
  margin-left: 70px;
`;
