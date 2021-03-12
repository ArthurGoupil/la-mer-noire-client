import React from "react";
import { useQuery } from "@apollo/client";

import { GET_TIMESTAMP } from "services/others.service";
import { getCookie, setCookie } from "utils/cookies.util";
import { ECookieName } from "constants/Cookies.constants";
import { QuestionRecord } from "models/Game.model";
interface UseQuizLifetimeProps {
  shortId: string;
  quizItemSignature: string;
  allPlayersHaveAnswered: boolean;
  duration: number;
  shouldFetchTimestampRef: boolean;
}

interface UseQuizLifetimeReturn {
  remainingTime: number | null;
  questionsRecord: Record<string, QuestionRecord>;
}

export const useQuizLifetime = ({
  shortId,
  quizItemSignature,
  allPlayersHaveAnswered,
  duration,
  shouldFetchTimestampRef,
}: UseQuizLifetimeProps): UseQuizLifetimeReturn => {
  const { refetch } = useQuery(GET_TIMESTAMP, {
    fetchPolicy: "no-cache",
    skip: true,
  });
  const [questionsRecord, setQuestionsRecord] = React.useState<Record<string, QuestionRecord>>(
    getCookie({
      prefix: shortId,
      cookieName: ECookieName.questionsRecord,
    }) || {},
  );

  const [remainingTime, setRemainingTime] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (questionsRecord[quizItemSignature]?.timestamp) {
      (async () => {
        const { timestamp } = (await refetch()).data;
        setRemainingTime(
          (questionsRecord[quizItemSignature]?.timestamp as number) + duration - timestamp,
        );
      })();
    } else {
      setRemainingTime(null);
    }
  }, [duration, questionsRecord, quizItemSignature, refetch]);

  const updateQuestionsRecord = React.useCallback(() => {
    setCookie<Record<string, QuestionRecord>>({
      prefix: shortId,
      cookieName: ECookieName.questionsRecord,
      cookieValue: questionsRecord,
    });
    setQuestionsRecord({ ...questionsRecord });
  }, [questionsRecord, shortId]);

  React.useEffect(() => {
    if (shouldFetchTimestampRef && !questionsRecord[quizItemSignature]?.timestamp) {
      (async () => {
        const { timestamp } = (await refetch()).data;
        questionsRecord[quizItemSignature] = { isDone: false, timestamp };
        updateQuestionsRecord();
      })();
    }
  }, [questionsRecord, quizItemSignature, refetch, shouldFetchTimestampRef, updateQuestionsRecord]);

  React.useEffect(() => {
    if (!questionsRecord[quizItemSignature]) {
      questionsRecord[quizItemSignature] = { isDone: false, timestamp: null };
      updateQuestionsRecord();
    }
  }, [questionsRecord, quizItemSignature, updateQuestionsRecord]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (questionsRecord[quizItemSignature] && !questionsRecord[quizItemSignature]?.isDone) {
      if (allPlayersHaveAnswered) {
        questionsRecord[quizItemSignature].isDone = true;
        updateQuestionsRecord();
      }
      if (remainingTime) {
        timeout = setTimeout(() => {
          questionsRecord[quizItemSignature].isDone = true;
          updateQuestionsRecord();
        }, remainingTime * 1000);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    allPlayersHaveAnswered,
    questionsRecord,
    quizItemSignature,
    remainingTime,
    shortId,
    updateQuestionsRecord,
  ]);

  return {
    remainingTime,
    questionsRecord,
  };
};
