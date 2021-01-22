import React from "react";
import styled from "styled-components";
import {
  radius,
  smallSpace,
  mainOrange,
  mainBlue,
  normalSpace,
} from "../../styles/StylingVariables";

interface GameCodeBlocProps {
  gameCode: string;
}

const GameCodeBloc: React.FC<GameCodeBlocProps> = ({
  gameCode,
}): JSX.Element => {
  return (
    <GameCodeBlocContainer className="d-flex align-center">
      <SmartphoneIcon src="/icons/phone-quiz.svg" />
      <CodeText className="d-flex align-center">
        Donnez le code de la partie à vos amis :<GameCode>{gameCode}</GameCode>
      </CodeText>
    </GameCodeBlocContainer>
  );
};

const GameCodeBlocContainer = styled.div`
  border-radius: ${radius};
  padding: ${smallSpace};
  margin-bottom: ${normalSpace};
  border: 5px solid ${mainBlue};
`;

const SmartphoneIcon = styled.img`
  width: 70px;
`;

const CodeText = styled.div`
  color: white;
  font-size: 25px;
  line-height: 30px;
  margin-left: ${smallSpace};
`;

const GameCode = styled.div`
  font-family: "Boogaloo", cursive;
  color: ${mainOrange};
  font-size: 30px;
  line-height: 30px;
  margin-left: 10px;
  font-weight: bold;
`;

export default GameCodeBloc;
