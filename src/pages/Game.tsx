import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

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
import FullContainer from "components/Utils/FullContainer";

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

  if (gameError)
    return (
      <FullContainer className="d-flex flex-column align-center justify-center">
        <ErrorWrapper>
          Partie non trouvée ! Vérifiez le code et réessayez.
        </ErrorWrapper>
        <LinkWrapper>
          <Link to="/">Revenir au menu principal</Link>
        </LinkWrapper>
      </FullContainer>
    );

  return !gameLoading && gameData ? (
    getCurrentComponent({ currentState: gameData.getGame.currentState })
  ) : (
    <Loader containerHeight="100vh" />
  );
};

const ErrorWrapper = styled.div`
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
`;
const LinkWrapper = styled.div`
  color: white;
  text-decoration: underline;
`;

export default Home;
