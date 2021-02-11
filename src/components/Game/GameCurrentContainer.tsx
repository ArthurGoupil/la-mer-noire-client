import React from "react";

import { Game } from "models/Game.model";
import GamePreparationContainer from "containers/Game/GamePreparation/GamePreparation.container";
import EGameStage from "constants/GameStage.constants";
import EUserType from "constants/GameUserType.constants";
import QuizContainer from "containers/Game/Quiz/Quiz.container";
import FullScreenError from "components/Utils/FullScreenError";

interface GameCurrentContainerProps {
  game: Game;
  userType: EUserType;
}

const GameCurrentContainer: React.FC<GameCurrentContainerProps> = ({
  game,
  userType,
}): JSX.Element => {
  switch (game?.stage) {
    case EGameStage.playersRegistration:
      return <GamePreparationContainer game={game} userType={userType} />;
    case EGameStage.caPasseOuCaCash: {
      return <QuizContainer game={game} userType={userType} />;
    }
    default:
      return (
        <FullScreenError
          errorLabel={`Erreur de type "unknown game current state."`}
          link="/"
          linkLabel="Revenir au menu principal"
        />
      );
  }
};

export default GameCurrentContainer;