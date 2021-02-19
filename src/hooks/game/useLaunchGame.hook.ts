import React from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_GAME_STAGE } from "services/games.service";
import { EGameStage } from "constants/GameStage.constants";
import { setCookie } from "utils/cookies.util";
import { ECookieName } from "constants/Cookies.constants";
import { PlayerData } from "models/Game.model";

interface useLaunchGameProps {
  shortId: string;
  players: PlayerData[];
}

interface UseLaunchGameReturn {
  handleLaunchGameCounter: () => void;
  launchGameButtonLabel: string;
}

export const useLaunchGame = ({
  shortId,
  players,
}: useLaunchGameProps): UseLaunchGameReturn => {
  const [launchCounter, setLaunchCounter] = React.useState<number | null>(null);
  const [updateGameStage] = useMutation(UPDATE_GAME_STAGE);

  const launchGame = async () => {
    setCookie({
      prefix: shortId,
      cookieName: ECookieName.caPasseOuCaCashState,
      cookieValue: {
        questionNumber: 1,
        playersPoints: players.reduce(
          (acc: Record<string, number>, cur: PlayerData) => {
            return { ...acc, [cur.player._id]: 0 };
          },
          {},
        ),
      },
    });
    await updateGameStage({
      variables: { stage: EGameStage.caPasseOuCaCash, shortId },
    });
  };

  const handleLaunchGameCounter = () => {
    if (!launchCounter) {
      setLaunchCounter(5);
    } else {
      setLaunchCounter(null);
    }
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (launchCounter && launchCounter > 0) {
      timeout = setTimeout(() => {
        setLaunchCounter(launchCounter - 1);
      }, 1000);
    } else if (launchCounter === 0) {
      (async () => await launchGame())();
    }

    return () => clearTimeout(timeout);
  }, [launchCounter]);

  return {
    handleLaunchGameCounter,
    launchGameButtonLabel: launchCounter
      ? `Lancement dans ... ${launchCounter.toString()}s (cliquez pour annuler)`
      : "Tout le monde est prêt !",
  };
};
