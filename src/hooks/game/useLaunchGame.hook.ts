import React from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_GAME_STAGE } from "services/games.service";
import { GameStage } from "constants/GameStage.constants";
import { setCookie } from "utils/cookies.util";
import { CookieName } from "constants/Cookies.constants";
import { CaPasseOuCaCashMaster, PlayerData, PlayersPoints } from "models/Game.model";
import { useSound } from "hooks/others/useSound.hook";
import { Sounds } from "constants/Sounds.constants";

interface useLaunchGameProps {
  shortId: string;
  players: PlayerData[];
}

interface UseLaunchGameReturn {
  handleLaunchGameCounter: () => void;
  launchGameButtonLabel: string;
}

export const useLaunchGame = ({ shortId, players }: useLaunchGameProps): UseLaunchGameReturn => {
  const [launchCounter, setLaunchCounter] = React.useState<number | null>(null);
  const [updatGameStage] = useMutation(UPDATE_GAME_STAGE);
  const { play, stop } = useSound({ sound: Sounds.gameStart, volume: 0.4 });

  const handleLaunchGameCounter = () => {
    if (!launchCounter) {
      setLaunchCounter(5);
    } else {
      setLaunchCounter(null);
      stop();
    }
  };

  React.useEffect(() => {
    const launchGame = async () => {
      setCookie<CaPasseOuCaCashMaster>({
        prefix: shortId,
        cookieName: CookieName.caPasseOuCaCashMaster,
        cookieValue: {
          state: "stageName_wait",
          quizLevel: "beginner",
          questionNumber: 1,
          playersPoints: players.reduce((acc: PlayersPoints, cur: PlayerData) => {
            return { ...acc, [cur.player._id]: { previous: 0, current: 0 } };
          }, {}),
        },
      });
      await updatGameStage({
        variables: { stage: GameStage.caPasseOuCaCash, shortId },
      });
    };

    let timeout: NodeJS.Timeout;
    if (launchCounter === 4) {
      play();
    }
    if (launchCounter && launchCounter > 0) {
      timeout = setTimeout(() => {
        setLaunchCounter(launchCounter - 1);
      }, 1000);
    } else if (launchCounter === 0) {
      (async () => await launchGame())();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [launchCounter, shortId, players, updatGameStage, play]);

  return {
    handleLaunchGameCounter,
    launchGameButtonLabel: launchCounter
      ? `Lancement dans ... ${launchCounter.toString()}s (cliquez pour annuler)`
      : "Tout le monde est prêt !",
  };
};
