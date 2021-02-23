import React from "react";

import { HostContainer } from "containers/Game/Quiz/Host/Host.container";
import { PlayerContainer } from "containers/Game/Quiz/Player/Player.container";
import { FullScreenError } from "components/Utils/FullScreenError";
import { EUserType } from "constants/GameUserType.constants";
import { useGame } from "hooks/game/useGame.hook";
import { getNS } from "utils/networkStatus.util";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";

interface QuizProps {
  shortId: string;
  userType: EUserType;
}

export const QuizContainer: React.FC<QuizProps> = ({
  shortId,
  userType,
}): JSX.Element => {
  const { game, networkStatus } = useGame({
    shortId,
    subscribe: {
      stage: true,
      players: true,
      currentQuizItem:
        userType === EUserType.play || userType === EUserType.join,
    },
  });

  if (userType in EUserType) {
    return {
      ready: {
        host: <HostContainer game={game} />,
        play: <PlayerContainer game={game} />,
        join: (
          <FullScreenError
            errorLabel="La partie a déjà commencé !"
            link={`/games/${game.shortId}/play`}
            linkLabel="Je le sais et je suis un joueur de cette partie"
          />
        ),
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
      errorLabel="Erreur inconnue."
      linkLabel="Revenir au menu principal"
      link="/"
    />
  );
};
