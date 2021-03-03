import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";

interface GameCodeBlocProps {
  gameCode: string;
}

export const GameCodeBloc: React.FC<GameCodeBlocProps> = ({ gameCode }): JSX.Element => {
  return (
    <GameCodeBlocContainer className="d-flex flex-column align-center justify-center">
      <GameCodeContainer className="d-flex align-center">
        <SmartphoneIcon src="/icons/phone-quiz.svg" />
        <GameCode>{gameCode}</GameCode>
      </GameCodeContainer>
      <CodeText>
        Rendez-vous sur <LMNUrl>lamernoire.fun</LMNUrl> pour rejoindre la partie.
      </CodeText>
    </GameCodeBlocContainer>
  );
};

const GameCodeBlocContainer = styled.div`
  border-radius: 10px;
  padding: 20px;
  border: 5px solid ${EStyles.blue};
`;

const GameCodeContainer = styled.span`
  margin-bottom: 20px;
`;

const SmartphoneIcon = styled.img`
  height: 50px;
`;

const CodeText = styled.div`
  font-size: 16px;
`;

const LMNUrl = styled.span`
  font-weight: bold;
`;

const GameCode = styled.div`
  font-family: "Boogaloo", cursive;
  color: ${EStyles.redOrange};
  font-size: 50px;
  line-height: 50px;
  margin-left: 20px;
  font-weight: bold;
`;
