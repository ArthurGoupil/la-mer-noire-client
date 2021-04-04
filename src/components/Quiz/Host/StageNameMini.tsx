import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";
import { GameStage } from "constants/GameStage.constants";
import { getStageName } from "utils/game/getStageName.util";

interface StageNameMiniProps {
  stage: GameStage;
}

export const StageNameMini: React.FC<StageNameMiniProps> = ({ stage }): JSX.Element => {
  const stageName = getStageName({ stage });

  return <Name>{stageName}</Name>;
};

const Name = styled.h2`
  font-size: 50px;
  color: ${Styles.redOrange};
  text-shadow: 2px 2px 0 ${Styles.yellow};
  text-align: center;
  font-style: italic;
`;
