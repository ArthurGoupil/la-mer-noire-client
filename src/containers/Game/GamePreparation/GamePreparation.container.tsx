import React from "react";

import { UserType } from "constants/GameUserType.constants";
import { HostGamePreparation } from "components/GamePreparation/HostGamePreparation";
import { JoinGamePreparation } from "components/GamePreparation/JoinGamePreparation";
import { FullScreenError } from "components/Utils/FullScreenError";
import { useGame } from "hooks/game/useGame.hook";
import { getNS } from "utils/networkStatus.util";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";
import { Game } from "models/Game.model";

interface GamePreparationProps {
  shortId: string;
  userType: UserType;
}

export const GamePreparationContainer: React.FC<GamePreparationProps> = ({
  shortId,
  userType,
}): JSX.Element => {
  const { game, networkStatus } = useGame({
    shortId,
    subscribe: {
      stage: true,
      players: true,
    },
    isHost: userType === "host",
  });
  const [currentGameData, setCurrentGameData] = React.useState<Game>();

  React.useEffect(() => {
    if (game) {
      setCurrentGameData(game);
    }
  }, [game]);

  if (userType in UserType && currentGameData) {
    return {
      ready: {
        host: <HostGamePreparation game={currentGameData} />,
        join: <JoinGamePreparation game={currentGameData} userType={userType} />,
        play: <JoinGamePreparation game={currentGameData} userType={userType} />,
      }[userType],
      loading: <FullHeightLoader />,
      error: (
        <FullScreenError
          errorLabel="La partie n'existe pas, vérifiez le code et réessayez."
          link="/"
          linkLabel="Revenir au menu principal"
        />
      ),
    }[getNS(networkStatus)];
  }

  return (
    <FullScreenError
      errorLabel={`Erreur de type "unknown user type."`}
      link="/"
      linkLabel="Revenir au menu principal"
    />
  );
};
