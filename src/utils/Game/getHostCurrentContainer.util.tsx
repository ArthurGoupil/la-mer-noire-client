import { Answer, Game } from "models/Game.model";
import EGameStage from "constants/GameStage.constants";
import FullScreenError from "components/Utils/FullScreenError";
import CaPasseOuCaCashContainer from "containers/Game/Quiz/Host/CaPasseOuCaCash.container";
import { QuizItemData } from "models/Quiz.model";

interface GetHostCurrentContainerProps {
  game: Game;
  quizItemData: QuizItemData;
  playersAnswers: Record<string, Answer>;
}
const getHostCurrentContainer = ({
  game,
  quizItemData,
  playersAnswers,
}: GetHostCurrentContainerProps): JSX.Element => {
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

export default getHostCurrentContainer;
