import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";

interface GameNameProps {
  gameName: string;
}

const GameName: React.FC<GameNameProps> = ({ gameName }): JSX.Element => {
  return <Name>{gameName}</Name>;
};

const Name = styled.h3`
  width: 250px;
  color: ${EStyles.yellow};
  text-shadow: 3px 3px 0 ${EStyles.redOrange};
  text-align: left;
  position: absolute;
  left: 30px;
  top: 30px;
`;

export default GameName;
