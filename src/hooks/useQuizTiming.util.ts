import React from "react";
import { useQuery } from "@apollo/client";

import { GET_TIMESTAMP } from "services/others.service";
import { Answer, PlayerData } from "models/Game.model";

interface UseQuizRemainingTimeProps {
  players: PlayerData[];
  playersAnswers: Record<string, Answer>;
  timestampReference: number;
  duration: number;
}

interface UseQuizRemainingTimeReturn {
  remainingTime: number;
  questionIsOver: boolean;
}

const useQuizTiming = ({
  players,
  playersAnswers,
  timestampReference,
  duration,
}: UseQuizRemainingTimeProps): UseQuizRemainingTimeReturn => {
  const { data } = useQuery(GET_TIMESTAMP);
  const remainingTime = timestampReference + duration - data?.timestamp;

  const [questionIsOver, setQuestionIsOver] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (remainingTime) {
      const timeout = setTimeout(() => {
        setQuestionIsOver(true);
      }, remainingTime * 1000);

      return () => clearTimeout(timeout);
    }
  }, [remainingTime]);

  React.useEffect(() => {
    if (Object.keys(playersAnswers).length === players.length) {
      setQuestionIsOver(true);
    }
  }, [playersAnswers]);

  return { remainingTime, questionIsOver };
};

export default useQuizTiming;