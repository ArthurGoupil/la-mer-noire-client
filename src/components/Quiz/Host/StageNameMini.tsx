import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { EGameStage } from "constants/GameStage.constants";
import { getStageName } from "utils/game/getStageName.util";

interface StageNameMiniProps {
  gameStage: EGameStage;
}

export const StageNameMini: React.FC<StageNameMiniProps> = ({ gameStage }): JSX.Element => {
  const stageName = getStageName({ gameStage });

  return <Name>{stageName}</Name>;
};

const Name = styled.h2`
  font-size: 50px;
  color: ${EStyles.redOrange};
  text-shadow: 2px 2px 0 ${EStyles.yellow};
  text-align: center;
  font-style: italic;
`;