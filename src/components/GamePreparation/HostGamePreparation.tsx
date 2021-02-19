import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { GameCodeBloc } from "components/GamePreparation/GameCodeBloc";
import { ItemsList } from "components/Utils/ItemsList";
import { LMNLogo } from "components/Utils/LMNLogo";
import { FullHeightContainer } from "components/Utils/FullHeightContainer";
import { useLaunchGame } from "hooks/game/useLaunchGame.hook";
import { Button } from "components/Utils/Button";
import { Game } from "models/Game.model";

interface HostGamePreparationProps {
  game: Game;
}

export const HostGamePreparation: React.FC<HostGamePreparationProps> = ({
  game,
}): JSX.Element => {
  const { handleLaunchGameCounter, launchGameButtonLabel } = useLaunchGame({
    shortId: game.shortId,
    players: game.players,
  });

  return (
    <FullHeightContainer className="d-flex flex-column align-center">
      <LMNLogo width="400px" margin={`20px 0 20px 0`} />
      <div className="d-flex flex-column align-center space-around flex-grow">
        <GameName>{game.name.toUpperCase()}</GameName>
        <GameCodeBloc gameCode={game.shortId} />
        <div>
          {game.players.length > 0 && (
            <>
              <PlayersTitle>Dans les starting blocks</PlayersTitle>
              <ItemsList
                list={game.players.map((playerData) => playerData.player)}
                labelKey="name"
                className="d-flex justify-center flex-wrap"
                maxWidth="600px"
                margin={`0 0 40px 0`}
              />
            </>
          )}
        </div>
        <Button
          onClick={handleLaunchGameCounter}
          label={launchGameButtonLabel}
        />
      </div>
    </FullHeightContainer>
  );
};

const GameName = styled.h1`
  color: ${EStyles.yellow};
  text-shadow: 3px 3px 0 ${EStyles.redOrange};
  text-align: center;
  margin-bottom: 20px;
`;
const PlayersTitle = styled.h2`
  color: ${EStyles.redOrange};
  text-shadow: 3px 3px 0 ${EStyles.blue};
  text-align: center;
  margin-bottom: 10px;
`;
