import { GameStage } from "constants/GameStage.constants";
import { HostSounds } from "constants/Sounds.constants";
import { Styles } from "constants/Styling.constants";
import { useSound } from "hooks/others/useSound.hook";
import React from "react";
import styled from "styled-components";
import { getStageName } from "utils/game/getStageName.util";

interface StageNameProps {
  stage: GameStage;
  canPlaySound: boolean;
}

export const StageName: React.FC<StageNameProps> = ({ stage, canPlaySound }): JSX.Element => {
  const stageName = getStageName({ stage });
  const [showStageName, setShowStageName] = React.useState<boolean>(false);
  const { play: CPOCCPlay, status: CPOCCStatus } = useSound({
    sound: HostSounds.CPOCCJingle,
    condition: canPlaySound,
  });
  const { play: kidimieuxPlay, status: kidimieuxStatus } = useSound({
    sound: HostSounds.kidimieuxJingle,
    condition: canPlaySound,
  });

  React.useEffect(() => {
    switch (stage) {
      case GameStage.caPasseOuCaCash:
        if (CPOCCStatus === "ready" && canPlaySound && !showStageName) {
          CPOCCPlay();
          setShowStageName(true);
        }
        break;
      case GameStage.kidimieux:
        if (kidimieuxStatus === "ready" && canPlaySound && !showStageName) {
          kidimieuxPlay();
          setShowStageName(true);
        }
        break;
    }
  }, [CPOCCPlay, CPOCCStatus, canPlaySound, kidimieuxPlay, kidimieuxStatus, showStageName, stage]);

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
