import React from "react";

import { HostContainer } from "containers/Game/Quiz/Host/Host.container";
import { PlayerContainer } from "containers/Game/Quiz/Player/Player.container";
import { FullScreenError } from "components/Utils/FullScreenError";
import { Game } from "models/Game.model";
import { EUserType } from "constants/GameUserType.constants";

interface QuizProps {
  game: Game;
  userType: EUserType;
}

export const QuizContainer: React.FC<QuizProps> = ({
  game,
  userType,
}): JSX.Element => {
  if (userType in EUserType) {
    return {
      host: <HostContainer game={game} />,
      play: <PlayerContainer game={game} />,
      join: (
        <FullScreenError
          errorLabel="La partie a déjà commencé !"
          link={`/games/${game.shortId}/play`}
          linkLabel="Je le sais et je suis un joueur de cette partie"
        />
      ),
    }[userType];
  }

  return (
    <FullScreenError
      errorLabel="Erreur inconnue."
      linkLabel="Revenir au menu principal"
      link="/"
    />
  );
};
