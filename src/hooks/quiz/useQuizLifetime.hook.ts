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
    const updateQuestionsRecord = () => {
      setCookie<Record<string, QuestionRecord>>({
        prefix: shortId,
        cookieName: ECookieName.questionsRecord,
        cookieValue: questionsRecord,
      });
      setQuestionsRecord({ ...questionsRecord });
    };

    let timeout: NodeJS.Timeout;
    if (quizItemSignature) {
      if (questionsRecord[quizItemSignature]) {
        if (!questionsRecord[quizItemSignature].isDone) {
          if (!questionsRecord[quizItemSignature]?.timestamp) {
            (async () => {
              const { timestamp } = (await refetch()).data;
              questionsRecord[quizItemSignature] = { isDone: false, timestamp };
              updateQuestionsRecord();
            })();
          }
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
      } else {
        questionsRecord[quizItemSignature] = { isDone: false, timestamp: null };
        updateQuestionsRecord();
      }
    }

    return () => clearTimeout(timeout);
  }, [refetch, questionsRecord, quizItemSignature, allPlayersHaveAnswered, remainingTime, shortId]);

  return {
    remainingTime,
    questionsRecord,
  };
};
