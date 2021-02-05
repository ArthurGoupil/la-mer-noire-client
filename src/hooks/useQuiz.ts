import React from "react";
import { ApolloError, useLazyQuery, useMutation } from "@apollo/client";

import { GET_QUIZ, GET_RANDOM_QUIZ_ID } from "services/quizzes.service";
import { CurrentQuizItem, Game } from "models/Game";
import {
  GET_GAME,
  UPDATE_GAME_CURRENT_QUIZ_ITEM,
} from "services/games.service";
import { QuizItemData, QuizItem } from "models/Quiz";

interface UseQuizProps {
  game: Game;
  isHost: boolean;
  resetAnswers?: () => void;
}

interface UseQuizReturn {
  quizItemData: QuizItemData | null;
  quizLoading: boolean;
  quizError: ApolloError | undefined;
  generateNewQuestion: () => void;
}

const useQuiz = ({
  game,
  isHost,
  resetAnswers,
}: UseQuizProps): UseQuizReturn => {
  const [
    currentQuizItem,
    setCurrentQuizItem,
  ] = React.useState<CurrentQuizItem | null>(null);

  const [quizItemData, setQuizItemData] = React.useState<QuizItemData | null>(
    null,
  );

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
    if (randomQuizId) {
      const currentQuizItem: CurrentQuizItem = {
        quizId: randomQuizId,
        level: "expert",
        quizItemId: 5,
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
  }, [randomQuizId]);

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
        quiz: quiz.quizItems[currentQuizItem.level].find(
          (quiz: QuizItem) => quiz.quizItemId === currentQuizItem.quizItemId,
        ) as QuizItem,
      });
    }
  }, [quiz]);

  const generateNewQuestion = (): void => {
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
    quizItemData,
    quizLoading,
    quizError: quizError || randomQuizIdError,
    generateNewQuestion,
  };
};

export default useQuiz;
