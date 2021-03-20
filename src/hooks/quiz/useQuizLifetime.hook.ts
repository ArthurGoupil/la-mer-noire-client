import React from "react";

import { getCookie, setCookie } from "utils/cookies.util";
import { CookieName } from "constants/Cookies.constants";
import { QuestionRecord } from "models/Game.model";
import { useMutation } from "@apollo/client";
import { GET_GAME, UPDATE_PLAYERS_CAN_ANSWER } from "services/games.service";
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
  const [updatePlayersCanAnswer] = useMutation(UPDATE_PLAYERS_CAN_ANSWER, {
    refetchQueries: [
      {
        query: GET_GAME,
        variables: { shortId },
      },
    ],
  });

  const updateQuestionsRecord = React.useCallback(() => {
    setCookie<Record<string, QuestionRecord>>({
      prefix: shortId,
      cookieName: CookieName.questionsRecord,
      cookieValue: questionsRecord,
    });
    setQuestionsRecord({ ...questionsRecord });
  }, [questionsRecord, shortId]);

  React.useEffect(() => {
    const setUpQuestion = async () => {
      await updatePlayersCanAnswer({ variables: { shortId, playersCanAnswer: true } });
      questionsRecord[quizItemSignature] = { isDone: false, timestamp: Date.now() / 1000 };
      updateQuestionsRecord();
    };

    if (shouldSetBaseTimestamp && !questionsRecord[quizItemSignature]?.timestamp) {
      setUpQuestion();
    }
  }, [
    questionsRecord,
    quizItemSignature,
    shortId,
    shouldSetBaseTimestamp,
    updatePlayersCanAnswer,
    updateQuestionsRecord,
  ]);

  React.useEffect(() => {
    if (!questionsRecord[quizItemSignature]) {
      questionsRecord[quizItemSignature] = { isDone: false, timestamp: null };
      updateQuestionsRecord();
    }
  }, [questionsRecord, quizItemSignature, updateQuestionsRecord]);

  React.useEffect(() => {
    const endQuestion = () => {
      questionsRecord[quizItemSignature].isDone = true;
      updateQuestionsRecord();
      updatePlayersCanAnswer({ variables: { shortId, playersCanAnswer: false } });
    };

    let timeout: NodeJS.Timeout;

    if (questionsRecord[quizItemSignature] && !questionsRecord[quizItemSignature]?.isDone) {
      if (allPlayersHaveAnswered) {
        endQuestion();
      }

      if (questionsRecord[quizItemSignature]?.timestamp) {
        const remainingTime = Math.round(
          (questionsRecord[quizItemSignature].timestamp as number) + duration - Date.now() / 1000,
        );

        timeout = setTimeout(() => {
          endQuestion();
        }, remainingTime * 1000);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    allPlayersHaveAnswered,
    duration,
    questionsRecord,
    quizItemSignature,
    shortId,
    updatePlayersCanAnswer,
    updateQuestionsRecord,
  ]);

  return {
    questionsRecord,
  };
};
