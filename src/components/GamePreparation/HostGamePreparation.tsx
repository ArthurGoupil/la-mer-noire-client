import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { GameCodeBloc } from "components/GamePreparation/GameCodeBloc";
import { PlayersList } from "components/GamePreparation/PlayersList";
import { LMNLogo } from "components/Utils/LMNLogo";
import { FullHeightLayout } from "components/Utils/FullHeightLayout";
import { useLaunchGame } from "hooks/game/useLaunchGame.hook";
import { Button } from "components/Utils/Button";
import { Game } from "models/Game.model";
import { AnimatedSubmarine } from "components/Utils/AnimatedSubmarine";
import { useSound } from "hooks/others/useSound.hook";
import { ESounds } from "constants/Sounds.constants";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";

interface HostGamePreparationProps {
  game: Game;
}

export const HostGamePreparation: React.FC<HostGamePreparationProps> = ({ game }): JSX.Element => {
  const { handleLaunchGameCounter, launchGameButtonLabel } = useLaunchGame({
    shortId: game.shortId,
    players: game.players,
  });
  const { status } = useSound({
    sound: ESounds.GamePrep,
    autoplay: true,
    loop: true,
    fadeOut: true,
    volume: 0.5,
  });

  return {
    ready: (
      <FullHeightLayout className="d-flex flex-column align-center">
        <LMNLogo width="400px" margin={`20px 0 20px 0`} />
        <div className="d-flex flex-column align-center space-around flex-grow">
          <GameName>{game.name.toUpperCase()}</GameName>
          <GameCodeBloc gameCode={game.shortId} />
          {game.players.length > 0 && <PlayersList playersList={game.players} />}
          <Button
            disabled={game.players.length < 1}
            onClick={handleLaunchGameCounter}
            label={launchGameButtonLabel}
          />
        </div>
        <AnimatedSubmarine />
      </FullHeightLayout>
    ),
    loading: <FullHeightLoader />,
  }[status];
};

const GameName = styled.h1`
  color: ${EStyles.yellow};
  text-shadow: 3px 3px 0 ${EStyles.redOrange};
  text-align: center;
  margin-bottom: 20px;
`;
