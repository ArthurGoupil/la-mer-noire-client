import { FetchResult } from "@apollo/client";
import { ECookieName } from "constants/Cookies.constants";
import { CurrentQuizItem } from "models/Game";
import { setGameCookie } from "./cookies.utils";

interface updatedCurrentQuizItemProps {
  shortId: string;
  currentQuizItem: CurrentQuizItem;
  updateMutation: (options: {
    variables: { shortId: string; currentQuizItem: CurrentQuizItem };
  }) => Promise<
    FetchResult<
      CurrentQuizItem,
      Record<string, CurrentQuizItem>,
      Record<string, CurrentQuizItem>
    >
  >;
}

export const globalUpdateCurrentQuizItem = async ({
  shortId,
  currentQuizItem,
  updateMutation,
}: updatedCurrentQuizItemProps): Promise<void> => {
  setGameCookie({
    prefix: shortId,
    cookieName: ECookieName.currentQuizItem,
    cookieValue: currentQuizItem,
  });
  await updateMutation({
    variables: { shortId, currentQuizItem },
  });
};
