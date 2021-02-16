import React from "react";

import { EUserType } from "constants/GameUserType.constants";
import { Game } from "models/Game.model";
import { HostGamePreparation } from "components/GamePreparation/HostGamePreparation";
import { JoinGamePreparation } from "components/GamePreparation/JoinGamePreparation";
import { FullScreenError } from "components/Utils/FullScreenError";

interface GameJoinProps {
  game: Game;
  userType: EUserType;
}

export const GamePreparationContainer: React.FC<GameJoinProps> = ({
  game,
  userType,
}): JSX.Element => {
  if (userType in EUserType) {
    return {
      host: <HostGamePreparation game={game} />,
      join: <JoinGamePreparation game={game} userType={userType} />,
      play: <JoinGamePreparation game={game} userType={userType} />,
    }[userType];
  }

  return (
    <FullScreenError
      errorLabel={`Erreur de type "unknown user type."`}
      link="/"
      linkLabel="Revenir au menu principal"
    />
  );
};
