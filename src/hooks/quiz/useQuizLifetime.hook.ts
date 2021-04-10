import React from "react";

import { getCookie, setCookie } from "utils/cookies.util";
import { CookieName } from "constants/Cookies.constants";
import { QuestionRecord } from "models/Game.model";
import { useMutation } from "@apollo/client";
import {
  GET_GAME,
  UPDATE_PLAYERS_CAN_ANSWER,
  UPDATE_PLAYERS_CAN_BUZZ,
} from "services/games.service";

interface UseQuizLifetimeProps {
  shortId: string;
  quizItemSignature: string;
  duration: number;
  quizIsOver: boolean;
  shouldSetQuizBaseTimestamp: boolean;
  buzzIsOver: boolean;
  clearBuzzTimeout: boolean;
  shouldSetBuzzBaseTimestamp: boolean;
}

interface UseQuizLifetimeReturn {
  questionsRecord: Record<string, QuestionRecord>;
}

export const useQuizLifetime = ({
  shortId,
  quizItemSignature,
  duration,
  quizIsOver,
  shouldSetQuizBaseTimestamp,
  buzzIsOver,
  clearBuzzTimeout,
  shouldSetBuzzBaseTimestamp,
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
  const [updatePlayersCanBuzz] = useMutation(UPDATE_PLAYERS_CAN_BUZZ, {
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

  const setUpQuizTimestamp = React.useCallback(async () => {
    await updatePlayersCanAnswer({ variables: { shortId, playersCanAnswer: true } });
    questionsRecord[quizItemSignature] = {
      isDone: false,
      timestamp: Date.now() / 1000,
      buzzIsDone: false,
      buzzTimestamp: questionsRecord[quizItemSignature].buzzTimestamp,
    };
    updateQuestionsRecord();
  }, [questionsRecord, quizItemSignature, shortId, updatePlayersCanAnswer, updateQuestionsRecord]);

  const setUpBuzzTimestamp = React.useCallback(async () => {
    await updatePlayersCanBuzz({ variables: { shortId, playersCanBuzz: true } });
    questionsRecord[quizItemSignature] = {
      isDone: false,
      timestamp: questionsRecord[quizItemSignature]?.timestamp,
      buzzIsDone: false,
      buzzTimestamp: Date.now() / 1000,
    };
    updateQuestionsRecord();
  }, [questionsRecord, quizItemSignature, shortId, updatePlayersCanBuzz, updateQuestionsRecord]);

  const endQuestion = React.useCallback(() => {
    questionsRecord[quizItemSignature].isDone = true;
    updateQuestionsRecord();
    updatePlayersCanAnswer({ variables: { shortId, playersCanAnswer: false } });
  }, [questionsRecord, quizItemSignature, shortId, updatePlayersCanAnswer, updateQuestionsRecord]);

  const endBuzz = React.useCallback(async () => {
    await updatePlayersCanBuzz({ variables: { shortId, playersCanBuzz: false } });
    questionsRecord[quizItemSignature].buzzIsDone = true;
    updateQuestionsRecord();
  }, [questionsRecord, quizItemSignature, shortId, updatePlayersCanBuzz, updateQuestionsRecord]);

  React.useEffect(() => {
    if (quizItemSignature && !questionsRecord[quizItemSignature]) {
      questionsRecord[quizItemSignature] = {
        isDone: false,
        timestamp: null,
        buzzIsDone: false,
        buzzTimestamp: null,
      };
      updateQuestionsRecord();
    }
  }, [questionsRecord, quizItemSignature, updateQuestionsRecord]);

  React.useEffect(() => {
    if (shouldSetQuizBaseTimestamp && !questionsRecord[quizItemSignature]?.timestamp) {
      setUpQuizTimestamp();
    }
  }, [questionsRecord, quizItemSignature, setUpQuizTimestamp, shouldSetQuizBaseTimestamp]);

  React.useEffect(() => {
    if (shouldSetBuzzBaseTimestamp && !questionsRecord[quizItemSignature]?.buzzTimestamp) {
      setUpBuzzTimestamp();
    }
  }, [questionsRecord, quizItemSignature, setUpBuzzTimestamp, shouldSetBuzzBaseTimestamp]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (questionsRecord[quizItemSignature] && !questionsRecord[quizItemSignature]?.isDone) {
      if (quizIsOver) {
        if (timeout) {
          clearTimeout(timeout);
        }
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

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [quizIsOver, duration, endQuestion, questionsRecord, quizItemSignature]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (questionsRecord[quizItemSignature] && !questionsRecord[quizItemSignature]?.buzzIsDone) {
      if (clearBuzzTimeout && timeout) {
        clearTimeout(timeout);
      }

      if (
        questionsRecord[quizItemSignature] &&
        !questionsRecord[quizItemSignature]?.buzzIsDone &&
        questionsRecord[quizItemSignature]?.buzzTimestamp
      ) {
        if (buzzIsOver) {
          endBuzz();
        }

        const remainingTime = Math.round(
          (questionsRecord[quizItemSignature].buzzTimestamp as number) +
            duration -
            Date.now() / 1000,
        );

        if (!clearBuzzTimeout) {
          timeout = setTimeout(() => {
            endBuzz();
          }, remainingTime * 1000);
        }
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [buzzIsOver, clearBuzzTimeout, duration, endBuzz, questionsRecord, quizItemSignature]);

  return {
    questionsRecord,
  };
};
