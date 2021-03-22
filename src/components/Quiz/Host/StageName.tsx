import { GameStage } from "constants/GameStage.constants";
import { HostSounds } from "constants/Sounds.constants";
import { Styles } from "constants/Styling.constants";
import { useSound } from "hooks/others/useSound.hook";
import React from "react";
import styled from "styled-components";
import { getStageName } from "utils/game/getStageName.util";

interface StageNameProps {
  gameStage: GameStage;
  canPlaySound: boolean;
}

export const StageName: React.FC<StageNameProps> = ({ gameStage, canPlaySound }): JSX.Element => {
  const stageName = getStageName({ gameStage });
  const [showStageName, setShowStageName] = React.useState<boolean>(false);
  const { play, status } = useSound({
    sound: HostSounds.CPOCCJingle,
    condition: canPlaySound,
  });

  React.useEffect(() => {
    if (status === "ready" && canPlaySound && !showStageName) {
      play();
      setShowStageName(true);
    }
  }, [status, play, showStageName, canPlaySound]);

  return (
    <StageNameContainer
      transform={showStageName ? "rotate(-7deg) scale(1)" : "rotate(-1080deg) scale(0)"}
    >
      {stageName}
    </StageNameContainer>
  );
};

const StageNameContainer = styled.h2<{ transform: string }>`
  font-size: 90px;
  line-height: 100px;
  transform: rotate(-7deg);
  color: ${Styles.redOrange};
  text-shadow: 2px 2px 0 ${Styles.yellow};
  text-align: center;
  font-style: italic;
  transform: ${(props) => props.transform};
  transition: transform 1.5s;
`;
