import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";
import GameCodeBloc from "components/GamePreparation/GameCodeBloc";
import PlayersList from "components/Utils/ItemsList";
import LMNLogo from "components/Utils/LMNLogo";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import Loader from "components/Utils/Loader";
import { handleLaunchGame } from "utils/Game/handleLaunchGame.utils";
import LaunchGameButton from "components/Utils/Button";
import CreatePlayer from "components/Utils/InputAndButton";
import { handleCreatePlayer } from "utils/Game/handleCreatePlayer.utils";
import EUserType from "constants/GameUserType.constants";
import { Game } from "models/Game";

interface GameJoinProps {
  game: Game;
  userType: EUserType;
}

const GamePreparation: React.FC<GameJoinProps> = ({
  game,
  userType,
}): JSX.Element => {
  const { handleLaunchGameCounter, launchGameButtonLabel } = handleLaunchGame({
    shortId: game.shortId,
  });

  const handleJoinGame = handleCreatePlayer({ shortId: game.shortId });

  return game ? (
    <FullHeightContainer className="d-flex flex-column align-center">
      <LMNLogo width="400px" margin={`20px 0 20px 0`} />
      <div className="d-flex flex-column align-center space-around flex-grow">
        <GameName>{game.name.toUpperCase()}</GameName>
        <GameCodeBloc
          gameCode={game.shortId}
          show={userType === EUserType.host}
        />
        <CreatePlayer
          handleSubmit={handleJoinGame}
          buttonLabel="Rejoindre la partie"
          placeholder="My lovely name"
          margin={`0 0 20px 0`}
          show={userType === "join"}
        />
        <div>
          <PlayersTitle show={game.players.length > 0}>
            Dans les starting blocks
          </PlayersTitle>
          <PlayersList
            list={game.players.map((playerData) => playerData.player)}
            labelKey="name"
            className="d-flex justify-center flex-wrap"
            maxWidth="600px"
            margin={`0 0 40px 0`}
            show={game.players.length > 0}
          />
        </div>
        <LaunchGameButton
          onClick={handleLaunchGameCounter}
          label={launchGameButtonLabel}
          show={userType === "host"}
        />
      </div>
    </FullHeightContainer>
  ) : (
    <FullHeightContainer className="d-flex justify-center align-center">
      <Loader />
    </FullHeightContainer>
  );
};

const GameName = styled.h1`
  color: ${EStyles.yellow};
  text-shadow: 3px 3px 0 ${EStyles.redOrange};
  text-align: center;
  margin-bottom: 20px;
`;
const PlayersTitle = styled.h2<{ show: boolean }>`
  color: ${EStyles.orange};
  text-shadow: 3px 3px 0 ${EStyles.blue};
  text-align: center;
  margin-bottom: 10px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

export default GamePreparation;
