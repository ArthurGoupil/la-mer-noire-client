import React from "react";
import styled from "styled-components";
import {} from "@apollo/client";

import EStyles from "constants/Styling.constants";
import { GAME_PLAYERS_UPDATED, getGame } from "services/games.service";
import GameCodeBloc from "components/Game/GameStates/GamePreparation/GameCodeBloc";
import PlayersList from "components/Utils/ItemsList";
import LMNLogo from "components/Utils/LMNLogo";
import FullContainer from "components/Utils/FullContainer";
import LaunchGame from "./LaunchGame";
import FullScreenError from "components/Utils/FullScreenError";
import Loader from "components/Utils/Loader";
import CreatePlayer from "./CreatePlayer";

interface GameJoinProps {
  shortId: string;
  userType: string;
}

const GamePreparation: React.FC<GameJoinProps> = ({
  shortId,
  userType,
}): JSX.Element => {
  const { subscribeToMore, gameLoading, gameError, gameData } = getGame({
    shortId,
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

  if (gameError) {
    return (
      <FullScreenError
        errorLabel="Partie non trouvée ! Vérifiez votre code de partie et réessayez."
        link="/"
        linkLabel="Revenir au menu principal"
      />
    );
  }

  return !gameLoading && gameData ? (
    <FullContainer className="d-flex flex-column align-center">
      <LMNLogo width="400px" margin={`20px 0 20px 0`} />
      <div className="d-flex flex-column align-center space-around flex-grow">
        <GameName>{gameData.game.name.toUpperCase()}</GameName>
        <GameCodeBloc
          gameCode={gameData.game.shortId}
          show={userType === "host"}
        />
        <CreatePlayer shortId={shortId} show={userType === "join"} />
        <div>
          <PlayersTitle show={gameData.game.players.length > 0}>
            Dans les starting blocks
          </PlayersTitle>
          <PlayersList
            list={gameData.game.players}
            labelKey="name"
            className="d-flex justify-center flex-wrap"
            maxWidth="600px"
            margin={`0 0 40px 0`}
            show={gameData.game.players.length > 0}
          />
        </div>
        <LaunchGame shortId={shortId} show={userType === "host"} />
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
