import { Answer, Game } from "models/Game";
import EGameStage from "constants/GameStage.constants";
import FullScreenError from "components/Error/FullScreenError";
import CaPasseOuCaCashContainer from "containers/Game/Quiz/Host/CaPasseOuCaCash.container";
import { QuizItemData } from "models/Quiz";
import { GenerateNewQuizItemDataProps } from "containers/Game/Quiz/Host/Host.container";

interface GetHostCurrentContainerProps {
  game: Game;
  quizItemData: QuizItemData;
  playersAnswers: Record<string, Answer>;
  handleGenerateNewQuizItemData: ({
    quizItemLevel,
    quizItemId,
  }: GenerateNewQuizItemDataProps) => void;
}
const getHostCurrentContainer = ({
  game,
  quizItemData,
  playersAnswers,
  handleGenerateNewQuizItemData,
}: GetHostCurrentContainerProps): JSX.Element => {
  switch (game.stage) {
    case EGameStage.caPasseOuCaCash:
      return (
        <CaPasseOuCaCashContainer
          game={game}
          quizItemData={quizItemData}
          playersAnswers={playersAnswers}
          handleGenerateNewQuizItemData={handleGenerateNewQuizItemData}
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
