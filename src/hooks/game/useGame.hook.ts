import React from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import {
  GET_GAME,
  GAME_STAGE_UPDATED,
  GAME_PLAYERS_UPDATED,
  CURRENT_QUIZ_ITEM_UPDATED,
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
  networkStatus: NetworkStatus;
}

export const useGame = ({
  shortId,
  subscribe = { stage: false, players: false, currentQuizItem: false },
}: UseGameProps): UseGameReturn => {
  const { subscribeToMore, data: { game } = {}, networkStatus } = useQuery(GET_GAME, {
    variables: { shortId },
  });

  React.useEffect(() => {
    let unsubscribeStage: () => void;
    let unsubscribePlayers: () => void;
    let unsubscribeCurrentQuizItem: () => void;
    if (subscribe.stage) {
      unsubscribeStage = subscribeToMore({
        document: GAME_STAGE_UPDATED,
        variables: { shortId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.gameStageUpdated;
          return newFeedItem;
        },
      });
    }
    if (subscribe.players) {
      unsubscribePlayers = subscribeToMore({
        document: GAME_PLAYERS_UPDATED,
        variables: { shortId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.gamePlayersUpdated;
          return newFeedItem;
        },
      });
    }
    if (subscribe.currentQuizItem) {
      unsubscribeCurrentQuizItem = subscribeToMore({
        document: CURRENT_QUIZ_ITEM_UPDATED,
        variables: { shortId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.currentQuizItemUpdated;
          return newFeedItem;
        },
      });
    }

    return () => {
      if (unsubscribeStage) unsubscribeStage();
      if (unsubscribePlayers) unsubscribePlayers();
      if (unsubscribeCurrentQuizItem) unsubscribeCurrentQuizItem();
    };
  }, [subscribeToMore, shortId, subscribe.stage, subscribe.players, subscribe.currentQuizItem]);

  return { game, networkStatus };
};
