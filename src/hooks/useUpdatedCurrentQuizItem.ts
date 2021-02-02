import React from "react";
import { useSubscription } from "@apollo/client";

import { ECookieName } from "constants/Cookies.constants";
import { setGameCookie } from "utils/cookies.utils";
import useCookie from "./useCookie";
import { GAME_CURRENT_QUIZ_ITEM_UPDATED } from "services/games.service";
import { CurrentQuizItem } from "models/Game";

interface UseUpdatedCurrentQuizItemProps {
  shortId: string;
}

const useUpdatedCurrentQuizItem = ({
  shortId,
}: UseUpdatedCurrentQuizItemProps): CurrentQuizItem => {
  const [
    updatedCurrentQuizItem,
    setUpdatedCurrentQuizItem,
  ] = React.useState<CurrentQuizItem>(
    useCookie<CurrentQuizItem>({
      prefix: shortId,
      cookieName: ECookieName.currentQuizItem,
    }),
  );
  const { data: currentQuizItemData } = useSubscription(
    GAME_CURRENT_QUIZ_ITEM_UPDATED,
    {
      variables: { shortId },
    },
  );

  React.useEffect(() => {
    if (currentQuizItemData) {
      setUpdatedCurrentQuizItem(currentQuizItemData.gameCurrentQuizItemUpdated);
      setGameCookie({
        prefix: shortId,
        cookieName: ECookieName.currentQuizItem,
        cookieValue: currentQuizItemData.gameCurrentQuizItemUpdated,
      });
    }
  }, [currentQuizItemData]);

  return updatedCurrentQuizItem;
};

export default useUpdatedCurrentQuizItem;
