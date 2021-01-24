import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import {
  GET_GAME,
  GAME_PLAYERS_CHANGED_SUBSCRIPTION,
  GAME_CURRENT_STATE_SUBSCRIPTION,
} from "service/games.service";
import Loader from "components/Utils/Loader";
import GameJoin from "components/Game/GameStates/GameJoin";
import { CurrentState } from "models/Game";
import { EGameCurrentStateStage } from "constants/GameCurrentState.constants";
import Quiz from "components/Game/GameStates/Quiz";

interface Params {
  shortId: string;
  userType: string;
}

const Home: React.FC<{}> = (): JSX.Element => {
  const { shortId, userType } = useParams<Params>();

  const {
    subscribeToMore,
    loading: gameLoading,
    error: gameError,
    data: gameData,
  } = useQuery(GET_GAME, {
    variables: { shortId },
  });

  React.useEffect(() => {
    subscribeToMore({
      document: GAME_PLAYERS_CHANGED_SUBSCRIPTION,
      variables: { shortId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.gamePlayersChanged;
        return newFeedItem;
      },
    });
    subscribeToMore({
      document: GAME_CURRENT_STATE_SUBSCRIPTION,
      variables: { shortId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.gameCurrentStateChanged;
        return newFeedItem;
      },
    });
  }, [subscribeToMore, shortId]);

  const getCurrentComponent = ({
    currentState,
  }: {
    currentState: CurrentState;
  }) => {
    switch (currentState.stage) {
      case EGameCurrentStateStage.playersRegistration:
        return (
          <GameJoin shortId={shortId} userType={userType} gameData={gameData} />
        );
      case EGameCurrentStateStage.question: {
        return (
          <Quiz shortId={shortId} userType={userType} gameData={gameData} />
        );
      }
      default:
        return <div>Error ! Unknown game current state.</div>;
    }
  };

  if (gameError) return <div>{`Error! ${gameError.message}`}</div>;

  return !gameLoading && gameData ? (
    getCurrentComponent({ currentState: gameData.getGame.currentState })
  ) : (
    <Loader containerHeight="100vh" />
  );
};

export default Home;
