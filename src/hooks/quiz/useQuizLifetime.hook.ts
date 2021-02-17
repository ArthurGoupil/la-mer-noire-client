import React from "react";
import { NetworkStatus, useQuery } from "@apollo/client";

import { GET_TIMESTAMP } from "services/others.service";
import { getCookie, setCookie } from "utils/cookies.util";
import { ECookieName } from "constants/Cookies.constants";

interface UseQuizRemainingTimeProps {
  shortId: string;
  quizId: string;
  allPlayersHaveAnswered: boolean;
  timestampReference: number;
  duration: number;
}

interface UseQuizRemainingTimeReturn {
  remainingTime: number;
  doneQuestionsRecord: Record<string, boolean>;
  networkStatus: NetworkStatus;
}

export const useQuizLifetime = ({
  shortId,
  quizId,
  allPlayersHaveAnswered,
  timestampReference,
  duration,
}: UseQuizRemainingTimeProps): UseQuizRemainingTimeReturn => {
  const { data, refetch, networkStatus } = useQuery(GET_TIMESTAMP, {
    fetchPolicy: "no-cache",
  });
  const remainingTime = timestampReference + duration - data?.timestamp;

  React.useEffect(() => {
    if (timestampReference) {
      (async () => await refetch())();
    }
  }, [timestampReference]);

  const [doneQuestionsRecord, setDoneQuestionsRecord] = React.useState<
    Record<string, boolean>
  >(
    getCookie({
      prefix: shortId,
      cookieName: ECookieName.doneQuestionsRecord,
    }) || {},
  );

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (remainingTime && !doneQuestionsRecord[quizId]) {
      timeout = setTimeout(() => {
        doneQuestionsRecord[quizId] = true;
        setCookie({
          prefix: shortId,
          cookieName: ECookieName.doneQuestionsRecord,
          cookieValue: doneQuestionsRecord,
        });
        setDoneQuestionsRecord({ ...doneQuestionsRecord });
      }, remainingTime * 1000);
    }
    return () => clearTimeout(timeout);
  }, [remainingTime]);

  React.useEffect(() => {
    if (allPlayersHaveAnswered && !doneQuestionsRecord[quizId]) {
      doneQuestionsRecord[quizId] = true;
      setCookie({
        prefix: shortId,
        cookieName: ECookieName.doneQuestionsRecord,
        cookieValue: doneQuestionsRecord,
      });
      setDoneQuestionsRecord({ ...doneQuestionsRecord });
    }
  }, [allPlayersHaveAnswered]);

  return {
    remainingTime,
    doneQuestionsRecord,
    networkStatus,
  };
};
