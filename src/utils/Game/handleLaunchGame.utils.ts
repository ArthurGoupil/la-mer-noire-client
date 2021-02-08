import React from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_GAME_STAGE } from "services/games.service";
import EGameStage from "constants/GameStage.constants";

interface HandleLaunchGameProps {
  shortId: string;
}

interface HandleLaunchGameReturn {
  handleLaunchGameCounter: () => void;
  launchGameButtonLabel: string;
}

export const handleLaunchGame = ({
  shortId,
}: HandleLaunchGameProps): HandleLaunchGameReturn => {
  const [launchCounter, setLaunchCounter] = React.useState<number | null>(null);
  const [updateGameStage] = useMutation(UPDATE_GAME_STAGE);

  const launchGame = async () => {
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
      launchGame();
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
