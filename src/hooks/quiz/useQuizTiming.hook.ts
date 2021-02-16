import React from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import { GET_TIMESTAMP } from "services/others.service";
import { Answer, PlayerData } from "models/Game.model";

interface UseQuizRemainingTimeProps {
  players: PlayerData[];
  playersAnswers: Record<string, Answer>;
  timestampReference: number;
  duration: number;
  isHost?: boolean;
}

interface UseQuizRemainingTimeReturn {
  remainingTime: number;
  questionIsOver: boolean;
  networkStatus: NetworkStatus;
}

export const useQuizTiming = ({
  players,
  playersAnswers,
  timestampReference,
  duration,
  isHost = false,
}: UseQuizRemainingTimeProps): UseQuizRemainingTimeReturn => {
  const { data, networkStatus } = useQuery(GET_TIMESTAMP, {
    fetchPolicy: "no-cache",
  });
  const remainingTime = timestampReference + duration - data?.timestamp;

  const [questionIsOver, setQuestionIsOver] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (remainingTime) {
      timeout = setTimeout(() => {
        setQuestionIsOver(true);
      }, remainingTime * 1000);
    }
    return () => clearTimeout(timeout);
  }, [remainingTime]);

  React.useEffect(() => {
    if (Object.keys(playersAnswers).length === players.length && isHost) {
      setQuestionIsOver(true);
    }
  }, [playersAnswers]);

  return {
    remainingTime,
    questionIsOver,
    networkStatus,
  };
};
