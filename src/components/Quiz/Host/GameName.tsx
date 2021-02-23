import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";

interface GameNameProps {
  gameName: string;
}

export const GameName: React.FC<GameNameProps> = ({
  gameName,
}): JSX.Element => {
  return <Name>{gameName.toUpperCase()}</Name>;
};

const Name = styled.h3`
  font-size: 35px;
  text-align: right;
  color: ${EStyles.yellow};
  text-shadow: 3px 3px 0 ${EStyles.redOrange};
`;
