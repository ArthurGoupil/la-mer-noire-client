import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import EStyles from "constants/Styling.constants";
import { GAME_PLAYERS_UPDATED, GET_GAME } from "services/games.service";
import GameCodeBloc from "components/GamePreparation/GameCodeBloc";
import PlayersList from "components/Utils/ItemsList";
import LMNLogo from "components/Utils/LMNLogo";
import FullContainer from "components/Utils/FullContainer";
import FullScreenError from "components/Error/FullScreenError";
import Loader from "components/Utils/Loader";
import { handleLaunchGame } from "utils/Game/handleLaunchGame.utils";
import LaunchGameButton from "components/Utils/Button";
import CreatePlayer from "components/Utils/InputAndButton";
import { handleCreatePlayer } from "utils/Game/handleCreatePlayer";

interface GameJoinProps {
  shortId: string;
  userType: string;
}

const GamePreparation: React.FC<GameJoinProps> = ({
  shortId,
  userType,
}): JSX.Element => {
  const {
    subscribeToMore,
    loading: gameLoading,
    error: gameError,
    data: { game },
  } = useQuery(GET_GAME, {
    variables: { shortId },
  });

  React.useEffect(() => {
    subscribeToMore({
      document: GAME_PLAYERS_UPDATED,
      variables: { shortId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.gamePlayersUpdated;
        return newFeedItem;
      },
    });
  }, [subscribeToMore, shortId]);

  const { handleLaunchGameCounter, launchGameButtonLabel } = handleLaunchGame({
    shortId,
  });

  const handleJoinGame = handleCreatePlayer({ shortId });

  if (gameError) {
    return (
      <FullScreenError
        errorLabel="Partie non trouvée ! Vérifiez votre code de partie et réessayez."
        link="/"
        linkLabel="Revenir au menu principal"
      />
    );
  }

  return !gameLoading && game ? (
    <FullContainer className="d-flex flex-column align-center">
      <LMNLogo width="400px" margin={`20px 0 20px 0`} />
      <div className="d-flex flex-column align-center space-around flex-grow">
        <GameName>{game.name.toUpperCase()}</GameName>
        <GameCodeBloc gameCode={game.shortId} show={userType === "host"} />
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
            list={game.players}
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
          color={EStyles.darkBlue}
          backgroundColor={EStyles.turquoise}
          hoverColor={EStyles.darken_turquoise}
          show={userType === "host"}
        />
      </div>
    </FullContainer>
  ) : (
    <Loader containerHeight="100vh" />
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
