import React from "react";
import { useParams } from "react-router-dom";

import Loader from "components/Utils/Loader";
import GamePreparationContainer from "containers/Game/GamePreparation/GamePreparation.container";
import { EGameStage } from "constants/GameCurrentState.constants";
import QuizContainer from "containers/Game/Quiz/Quiz.container";
import FullScreenError from "components/Error/FullScreenError";
import useGame from "hooks/useGame";

interface Params {
  shortId: string;
  userType: string;
}

const Game: React.FC<{}> = (): JSX.Element => {
  const { shortId, userType } = useParams<Params>();
  const { game, gameError } = useGame({ shortId, subscribe: { stage: true } });

  const getCurrentComponent = ({
    gameStage,
  }: {
    gameStage: string;
  }): JSX.Element => {
    switch (gameStage) {
      case EGameStage.playersRegistration:
        return (
          <GamePreparationContainer shortId={shortId} userType={userType} />
        );
      case EGameStage.question: {
        return <QuizContainer shortId={shortId} userType={userType} />;
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

  if (gameError) {
    return (
      <FullScreenError
        errorLabel="Erreur lors du chargement de la partie."
        link="/"
        linkLabel="Revenir au menu principal"
      />
    );
  }

  return game ? (
    getCurrentComponent({ gameStage: game.stage })
  ) : (
    <Loader containerHeight="100vh" />
  );
};

export default Game;
