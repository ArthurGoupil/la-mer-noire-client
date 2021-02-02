import React from "react";
import { useSubscription } from "@apollo/client";

import { ECookieName } from "constants/Cookies.constants";
import { setGameCookie } from "utils/cookies.utils";
import useCookie from "./useCookie";
import { GAME_STAGE_UPDATED } from "services/games.service";

interface UseUpdatedStageProps {
  shortId: string;
}

const useUpdatedStage = ({ shortId }: UseUpdatedStageProps): string => {
  const [updatedStage, setUpdatedStage] = React.useState<string>(
    useCookie<string>({
      prefix: shortId,
      cookieName: ECookieName.stage,
    }),
  );
  const { data: stageData } = useSubscription(GAME_STAGE_UPDATED, {
    variables: { shortId },
  });

  React.useEffect(() => {
    if (stageData) {
      setUpdatedStage(stageData.gameStageUpdated.stage);
      setGameCookie({
        prefix: shortId,
        cookieName: ECookieName.stage,
        cookieValue: stageData.gameStageUpdated.stage,
      });
    }
  }, [stageData]);

  return updatedStage;
};

export default useUpdatedStage;
