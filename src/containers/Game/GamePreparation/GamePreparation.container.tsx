import React from "react";

import { UserType } from "constants/GameUserType.constants";
import { HostGamePreparation } from "components/GamePreparation/HostGamePreparation";
import { JoinGamePreparation } from "components/GamePreparation/JoinGamePreparation";
import { FullScreenError } from "components/Utils/FullScreenError";
import { useGame } from "hooks/game/useGame.hook";
import { getNS } from "utils/networkStatus.util";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";

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

  if (userType in UserType) {
    return {
      ready: {
        host: <HostGamePreparation game={game} />,
        join: <JoinGamePreparation game={game} userType={userType} />,
        play: <JoinGamePreparation game={game} userType={userType} />,
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
