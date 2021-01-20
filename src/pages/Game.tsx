import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_GAME, GAME_PLAYERS_CHANGED_SUBSCRIPTION } from "../service/games";
import { Id } from "../models/Game";

const Home: React.FC<{}> = (): JSX.Element => {
  const { id } = useParams<Id>();
  const {
    subscribeToMore: gameSubscribeToMore,
    loading: gameLoading,
    error: gameError,
    data: gameData,
  } = useQuery(GET_GAME, {
    variables: { id },
  });

  React.useEffect(() => {
    gameSubscribeToMore({
      document: GAME_PLAYERS_CHANGED_SUBSCRIPTION,
      variables: { gameId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.gamePlayersChanged;
        return newFeedItem;
      },
    });
  }, [gameSubscribeToMore, id]);

  if (gameLoading) return <div>Loading...</div>;
  if (gameError) return <div>{`Error! ${gameError.message}`}</div>;

  return (
    <div>
      {gameData.getGame.players.map((player: any) => {
        return <div>{player.name}</div>;
      })}
    </div>
  );
};

export default Home;
