import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";

interface GameCodeBlocProps {
  gameCode: string;
}

export const GameCodeBloc: React.FC<GameCodeBlocProps> = ({
  gameCode,
}): JSX.Element => {
  return (
    <GameCodeBlocContainer className="d-flex align-center">
      <SmartphoneIcon src="/icons/phone-quiz.svg" />
      <CodeText className="d-flex align-end">
        Donnez le code de la partie à vos amis :<GameCode>{gameCode}</GameCode>
      </CodeText>
    </GameCodeBlocContainer>
  );
};

const GameCodeBlocContainer = styled.div`
  border-radius: ${EStyles.radius};
  padding: 20px;
  border: 5px solid ${EStyles.blue};
`;

const SmartphoneIcon = styled.img`
  width: 70px;
`;

const CodeText = styled.div`
  font-size: 20px;
  line-height: 20px;
  margin-left: 20px;

  @media only screen and (max-width: ${EStyles.mobileBreakPoint}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const GameCode = styled.div`
  font-family: "Boogaloo", cursive;
  color: ${EStyles.redOrange};
  font-size: 30px;
  line-height: 30px;
  margin-left: 10px;
  font-weight: bold;

  @media only screen and (max-width: ${EStyles.mobileBreakPoint}) {
    margin-left: 0;
    margin-top: 10px;
  }
`;
