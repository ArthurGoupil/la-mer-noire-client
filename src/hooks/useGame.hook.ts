import React from "react";
import { ApolloError, useQuery } from "@apollo/client";

import {
  GET_GAME,
  GAME_CURRENT_QUIZ_ITEM_UPDATED,
  GAME_STAGE_UPDATED,
  GAME_PLAYERS_UPDATED,
} from "services/games.service";
import { Game } from "models/Game.model";

interface UseGameProps {
  shortId: string;
  subscribe?: Subscription;
}

interface Subscription {
  stage?: boolean;
  players?: boolean;
  currentQuizItem?: boolean;
}

interface UseGameReturn {
  game: Game;
  gameError: ApolloError | undefined;
}

const useGame = ({
  shortId,
  subscribe = { stage: false, players: false, currentQuizItem: false },
}: UseGameProps): UseGameReturn => {
  const { subscribeToMore, data: { game } = {}, error: gameError } = useQuery(
    GET_GAME,
    {
      variables: { shortId },
    },
  );

  React.useEffect(() => {
    if (subscribe.stage) {
      subscribeToMore({
        document: GAME_STAGE_UPDATED,
        variables: { shortId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.gameStageUpdated;
          return newFeedItem;
        },
      });
    }
    if (subscribe.currentQuizItem) {
      subscribeToMore({
        document: GAME_CURRENT_QUIZ_ITEM_UPDATED,
        variables: { shortId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.gameCurrentQuizItemUpdated;
          return newFeedItem;
        },
      });
    }
    if (subscribe.players) {
      subscribeToMore({
        document: GAME_PLAYERS_UPDATED,
        variables: { shortId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.gamePlayersUpdated;
          return newFeedItem;
        },
      });
    }
  }, [subscribeToMore, shortId]);

  return { game, gameError };
};

export default useGame;
