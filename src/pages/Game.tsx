import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import {
  GET_GAME,
  GAME_PLAYERS_CHANGED_SUBSCRIPTION,
  GAME_CURRENT_STATE_SUBSCRIPTION,
} from "../service/games";
import FullContainer from "../components/Utils/FullContainer";
import LMNLogo from "../components/Utils/LMNLogo";
import { smallSpace } from "../styles/StylingVariables";
import Loader from "../components/Utils/Loader";
import GameJoin from "../components/Game/GameStates/GameJoin";
import { CurrentState } from "../models/Game";

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
    switch (currentState.type) {
      case "playersRegistration":
        return (
          <GameJoin shortId={shortId} userType={userType} gameData={gameData} />
        );
      case "question": {
        return <div>{currentState.type}</div>;
      }
      default:
        console.log("Unknown current state.");
    }
  };

  if (gameError) return <div>{`Error! ${gameError.message}`}</div>;

  return (
    <FullContainer className="d-flex flex-column align-center space-around">
      {!gameLoading ? (
        <>
          <LMNLogo width="400px" margin={`${smallSpace} 0 ${smallSpace} 0`} />
          {getCurrentComponent({ currentState: gameData.getGame.currentState })}
        </>
      ) : (
        <Loader containerHeight="100vh" />
      )}
    </FullContainer>
  );
};

export default Home;
