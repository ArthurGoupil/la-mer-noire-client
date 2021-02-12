import React from "react";

import { Game } from "models/Game.model";
import EGameStage from "constants/GameStage.constants";
import FullScreenError from "components/Utils/FullScreenError";
import CaPasseOuCaCashContainer from "containers/Game/Quiz/Host/CaPasseOuCaCash.container";
import { QuizItemData } from "models/Quiz.model";
import useGetAnswers from "hooks/useGetAnswer.hook";

interface HostCurrentContainerProps {
  game: Game;
  quizItemData: QuizItemData;
}
const HostCurrentContainer: React.FC<HostCurrentContainerProps> = ({
  game,
  quizItemData,
}): JSX.Element => {
  const playersAnswers = useGetAnswers({
    shortId: game.shortId,
    quizItemData,
    players: game.players,
  });

  switch (game.stage) {
    case EGameStage.caPasseOuCaCash:
      return (
        <CaPasseOuCaCashContainer
          game={game}
          quizItemData={quizItemData}
          playersAnswers={playersAnswers}
        />
      );
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

export default HostCurrentContainer;
