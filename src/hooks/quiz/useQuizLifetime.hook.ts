import React from "react";

import { getCookie, setCookie } from "utils/cookies.util";
import { CookieName } from "constants/Cookies.constants";
import { QuestionRecord } from "models/Game.model";
interface UseQuizLifetimeProps {
  shortId: string;
  quizItemSignature: string;
  allPlayersHaveAnswered: boolean;
  duration: number;
  shouldSetBaseTimestamp: boolean;
}

interface UseQuizLifetimeReturn {
  questionsRecord: Record<string, QuestionRecord>;
}

export const useQuizLifetime = ({
  shortId,
  quizItemSignature,
  allPlayersHaveAnswered,
  duration,
  shouldSetBaseTimestamp,
}: UseQuizLifetimeProps): UseQuizLifetimeReturn => {
  const [questionsRecord, setQuestionsRecord] = React.useState<Record<string, QuestionRecord>>(
    getCookie({
      prefix: shortId,
      cookieName: CookieName.questionsRecord,
    }) || {},
  );

  const updateQuestionsRecord = React.useCallback(() => {
    setCookie<Record<string, QuestionRecord>>({
      prefix: shortId,
      cookieName: CookieName.questionsRecord,
      cookieValue: questionsRecord,
    });
    setQuestionsRecord({ ...questionsRecord });
  }, [questionsRecord, shortId]);

  React.useEffect(() => {
    if (shouldSetBaseTimestamp && !questionsRecord[quizItemSignature]?.timestamp) {
      questionsRecord[quizItemSignature] = { isDone: false, timestamp: Date.now() / 1000 };
      updateQuestionsRecord();
    }
  }, [questionsRecord, quizItemSignature, shouldSetBaseTimestamp, updateQuestionsRecord]);

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

      if (questionsRecord[quizItemSignature]?.timestamp) {
        const remainingTime = Math.round(
          (questionsRecord[quizItemSignature].timestamp as number) + duration - Date.now() / 1000,
        );

        timeout = setTimeout(() => {
          questionsRecord[quizItemSignature].isDone = true;
          updateQuestionsRecord();
        }, remainingTime * 1000);
      }
    }

    return () => clearTimeout(timeout);
  }, [allPlayersHaveAnswered, duration, questionsRecord, quizItemSignature, updateQuestionsRecord]);

  return {
    questionsRecord,
  };
};
