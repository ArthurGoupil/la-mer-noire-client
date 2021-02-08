import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";
import EGameStage from "constants/GameStage.constants";
import useGameStageName from "hooks/useGameStageName";

interface StageNameProps {
  gameStage: EGameStage;
}

const StageName: React.FC<StageNameProps> = ({ gameStage }): JSX.Element => {
  const stageName = useGameStageName({ gameStage });

  return <Name>{stageName}</Name>;
};

const Name = styled.h2`
  color: ${EStyles.orange};
  text-shadow: 2px 2px 0 ${EStyles.yellow};
  text-align: center;
  margin-bottom: 20px;
  font-style: italic;
`;

export default StageName;
