import React from "react";
import { useQuery } from "@apollo/client";

import { GET_TIMESTAMP } from "services/others.service";
import { getCookie, setCookie } from "utils/cookies.util";
import { ECookieName } from "constants/Cookies.constants";
import { QuestionRecord } from "models/Game.model";
interface UseQuizRemainingTimeProps {
  shortId: string;
  quizItemSignature: string;
  allPlayersHaveAnswered: boolean;
  duration: number;
}

interface UseQuizRemainingTimeReturn {
  remainingTime: number;
  questionsRecord: Record<string, QuestionRecord>;
}

export const useQuizLifetime = ({
  shortId,
  quizItemSignature,
  allPlayersHaveAnswered,
  duration,
}: UseQuizRemainingTimeProps): UseQuizRemainingTimeReturn => {
  const { data, refetch } = useQuery(GET_TIMESTAMP, {
    fetchPolicy: "no-cache",
  });
  const [questionsRecord, setQuestionsRecord] = React.useState<Record<string, QuestionRecord>>(
    getCookie({
      prefix: shortId,
      cookieName: ECookieName.questionsRecord,
    }) || {},
  );

  const remainingTime =
    (questionsRecord[quizItemSignature]?.timestamp || NaN) + duration - data?.timestamp;

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (questionsRecord[quizItemSignature]) {
      if (!questionsRecord[quizItemSignature]?.timestamp && quizItemSignature) {
        (async () => {
          const { timestamp } = (await refetch()).data;
          questionsRecord[quizItemSignature] = { isDone: false, timestamp };
          setCookie({
            prefix: shortId,
            cookieName: ECookieName.questionsRecord,
            cookieValue: questionsRecord,
          });
          setQuestionsRecord({ ...questionsRecord });
        })();
      }

      if (allPlayersHaveAnswered && !questionsRecord[quizItemSignature].isDone) {
        questionsRecord[quizItemSignature].isDone = true;
        setCookie({
          prefix: shortId,
          cookieName: ECookieName.questionsRecord,
          cookieValue: questionsRecord,
        });
        setQuestionsRecord({ ...questionsRecord });
      }

      if (remainingTime && !questionsRecord[quizItemSignature]?.isDone) {
        timeout = setTimeout(() => {
          questionsRecord[quizItemSignature].isDone = true;
          setCookie({
            prefix: shortId,
            cookieName: ECookieName.questionsRecord,
            cookieValue: questionsRecord,
          });
          setQuestionsRecord({ ...questionsRecord });
        }, remainingTime * 1000);
      }
    } else {
      questionsRecord[quizItemSignature] = { isDone: false, timestamp: null };
      setCookie({
        prefix: shortId,
        cookieName: ECookieName.questionsRecord,
        cookieValue: questionsRecord,
      });
      setQuestionsRecord({ ...questionsRecord });
    }

    return () => clearTimeout(timeout);
  }, [refetch, questionsRecord, quizItemSignature, allPlayersHaveAnswered, remainingTime, shortId]);

  return {
    remainingTime,
    questionsRecord,
  };
};
