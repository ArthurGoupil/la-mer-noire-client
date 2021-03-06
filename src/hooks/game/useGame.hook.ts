import React from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import {
  GET_GAME,
  GAME_STAGE_UPDATED,
  GAME_PLAYERS_UPDATED,
  CURRENT_QUIZ_ITEM_UPDATED,
} from "services/games.service";
import { Game } from "models/Game.model";
import { useSound } from "hooks/others/useSound.hook";
import { HostSounds } from "constants/Sounds.constants";

interface UseGameProps {
  shortId: string;
  subscribe?: Subscription;
  isHost?: boolean;
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
  isHost = false,
}: UseGameProps): UseGameReturn => {
  const { subscribeToMore, data: { game } = {}, networkStatus } = useQuery(GET_GAME, {
    variables: { shortId },
  });
  const [canSubscribe, setCanSubscribe] = React.useState<boolean>(true);
  const { play: playerAddedPlay } = useSound({ sound: HostSounds.playerAdded });

  React.useEffect(() => {
    return () => setCanSubscribe(false);
  }, []);

  React.useEffect(() => {
    let unsubscribeStage: (() => void) | undefined = undefined;
    let unsubscribePlayers: (() => void) | undefined = undefined;
    let unsubscribeCurrentQuizItem: (() => void) | undefined = undefined;

    if (subscribe.stage && canSubscribe && !unsubscribeStage) {
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
    if (subscribe.players && canSubscribe && !unsubscribePlayers) {
      unsubscribePlayers = subscribeToMore({
        document: GAME_PLAYERS_UPDATED,
        variables: { shortId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          if (isHost) {
            playerAddedPlay();
          }
          const newFeedItem = subscriptionData.data.gamePlayersUpdated;
          return newFeedItem;
        },
      });
    }
    if (subscribe.currentQuizItem && canSubscribe && !unsubscribeCurrentQuizItem) {
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
  }, [
    subscribeToMore,
    shortId,
    subscribe.stage,
    subscribe.players,
    subscribe.currentQuizItem,
    playerAddedPlay,
    isHost,
    canSubscribe,
  ]);

  return { game, networkStatus };
};
