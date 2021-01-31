import { useLazyQuery, useMutation } from "@apollo/client";
import { ECookieName } from "constants/Cookies.constants";

import { UPDATE_GAME_CURRENT_QUIZ_ITEM } from "services/games.service";
import { GET_RANDOM_QUIZ_ID } from "services/quizzes.service";
import { setGameCookie } from "./cookies.utils";

interface SetNewCurrentQuizItemProps {
  shortId: string;
  level: string;
  quizItemId: number;
  callback?: () => void;
}

const setNewCurrentQuizItem = ({
  shortId,
  level,
  quizItemId,
  callback,
}: SetNewCurrentQuizItemProps) => {
  const [updateGameCurrentQuizItem] = useMutation(
    UPDATE_GAME_CURRENT_QUIZ_ITEM,
  );
  const [triggerNewCurrentQuizItem, { refetch }] = useLazyQuery(
    GET_RANDOM_QUIZ_ID,
    {
      onCompleted: async (data) => {
        const currentQuizItem = {
          quizId: data.randomQuizId,
          level,
          quizItemId,
        };
        await updateGameCurrentQuizItem({
          variables: { shortId, currentQuizItem },
        });

        if (callback) {
          callback();
        }
      },
    },
  );

  return [triggerNewCurrentQuizItem, refetch];
};

export default setNewCurrentQuizItem;
