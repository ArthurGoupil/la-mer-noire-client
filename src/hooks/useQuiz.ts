import React from "react";
import { ApolloError, useLazyQuery, useMutation } from "@apollo/client";

import { GET_QUIZ, GET_RANDOM_QUIZ_ID } from "services/quizzes.service";
import { CurrentQuizItem, Game, QuizItemId, QuizItemLevel } from "models/Game";
import {
  GET_GAME,
  UPDATE_GAME_CURRENT_QUIZ_ITEM,
} from "services/games.service";
import { QuizItemData, QuizItem } from "models/Quiz";

interface UseQuizProps {
  game: Game;
  isHost: boolean;
  quizItemLevel?: QuizItemLevel;
  quizItemId?: QuizItemId;
  resetAnswers?: () => void;
}

interface UseQuizReturn {
  quizItemData: QuizItemData;
  quizLoading: boolean;
  quizError: ApolloError | undefined;
  generateNewQuizItem: () => void;
}

const useQuiz = ({
  game,
  isHost,
  quizItemLevel,
  quizItemId,
  resetAnswers,
}: UseQuizProps): UseQuizReturn => {
  const [
    currentQuizItem,
    setCurrentQuizItem,
  ] = React.useState<CurrentQuizItem | null>(null);

  const [quizItemData, setQuizItemData] = React.useState<QuizItemData>();

  const [
    triggerGetRandomQuizId,
    {
      data: { randomQuizId } = { randomQuizId: null },
      error: randomQuizIdError,
      refetch: randomQuizIdRefetch,
    },
  ] = useLazyQuery<{ randomQuizId: string }>(GET_RANDOM_QUIZ_ID, {
    fetchPolicy: "network-only",
  });

  const [
    triggerGetQuiz,
    { data: { quiz } = { quiz: null }, loading: quizLoading, error: quizError },
  ] = useLazyQuery(GET_QUIZ, {
    variables: { id: currentQuizItem?.quizId },
  });

  const [updateGameCurrentQuizItem] = useMutation(
    UPDATE_GAME_CURRENT_QUIZ_ITEM,
    {
      refetchQueries: isHost
        ? []
        : [{ query: GET_GAME, variables: { shortId: game.shortId } }],
    },
  );

  React.useEffect(() => {
    if (game) {
      if (game.currentQuizItem.quizId) {
        setCurrentQuizItem(game.currentQuizItem);
      } else if (isHost) {
        triggerGetRandomQuizId();
      }
    }
  }, [game]);

  React.useEffect(() => {
    if (isHost && randomQuizId && quizItemLevel && quizItemId) {
      const currentQuizItem: CurrentQuizItem = {
        quizId: randomQuizId,
        level: quizItemLevel,
        quizItemId,
      };
      (async () =>
        await updateGameCurrentQuizItem({
          variables: {
            shortId: game.shortId,
            currentQuizItem,
          },
        }))();
      setCurrentQuizItem(currentQuizItem);
    }
  }, [randomQuizId, quizItemId, quizItemLevel]);

  React.useEffect(() => {
    if (currentQuizItem) {
      triggerGetQuiz();
    }
  }, [currentQuizItem]);

  React.useEffect(() => {
    if (quiz && currentQuizItem?.quizItemId) {
      setQuizItemData({
        quizId: quiz._id,
        category: quiz.category,
        theme: quiz.theme,
        subTheme: quiz.subTheme,
        quiz: quiz.quizItems[quizItemLevel || currentQuizItem.level].find(
          (quiz: QuizItem) =>
            quiz.quizItemId === (quizItemId || currentQuizItem.quizItemId),
        ) as QuizItem,
      });
    }
  }, [quiz, currentQuizItem, quizItemId, quizItemLevel]);

  const generateNewQuizItem = (): void => {
    if (randomQuizIdRefetch) {
      randomQuizIdRefetch();
    } else {
      triggerGetRandomQuizId();
    }
    if (resetAnswers) {
      resetAnswers();
    }
  };

  return {
    quizItemData: quizItemData as QuizItemData,
    quizLoading,
    quizError: quizError || randomQuizIdError,
    generateNewQuizItem,
  };
};

export default useQuiz;
