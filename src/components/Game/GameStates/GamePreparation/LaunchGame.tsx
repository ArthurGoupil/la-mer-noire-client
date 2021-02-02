import React from "react";
import { useMutation } from "@apollo/client";

import { EGameStage } from "constants/GameCurrentState.constants";
import EStyles from "constants/Styling.constants";
import { UPDATE_GAME_STAGE } from "services/games.service";
import Button from "components/Utils/Button";

interface LaunchGameButtonProps {
  shortId: string;
  show: boolean;
}

const LaunchGame: React.FC<LaunchGameButtonProps> = ({
  shortId,
  show,
}): JSX.Element => {
  const [launchCounter, setLaunchCounter] = React.useState<number | null>(null);
  const [updateGameStage] = useMutation(UPDATE_GAME_STAGE);

  const handleLaunchGame = async () => {
    await updateGameStage({
      variables: { stage: EGameStage.question, shortId },
    });
  };

  const handleLaunchCounter = () => {
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
      handleLaunchGame();
    }

    return () => clearTimeout(timeout);
  }, [launchCounter]);

  return (
    <Button
      onClick={handleLaunchCounter}
      label={
        launchCounter
          ? `Lancement dans ... ${launchCounter.toString()}s (cliquez pour annuler)`
          : "Tout le monde est prêt !"
      }
      color={EStyles.darkBlue}
      backgroundColor={EStyles.turquoise}
      hoverColor={EStyles.darken_turquoise}
      show={show}
    />
  );
};

export default LaunchGame;
