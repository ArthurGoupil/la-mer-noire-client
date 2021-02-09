import React from "react";
import { useSubscription } from "@apollo/client";

import { PLAYER_ANSWERED } from "services/games.service";
import Loader from "components/Utils/Loader";
import { Answer, Game, QuizItemId, QuizItemLevel } from "models/Game";
import { setCookie } from "utils/cookies.utils";
import ECookieName from "constants/Cookies.constants";
import useCookie from "hooks/useCookie";
import useQuiz from "hooks/useQuiz";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import LMNLogo from "components/Utils/LMNLogo";
import GameName from "components/Quiz/Host/GameName";
import StageName from "components/Quiz/Host/StageName";
import getRandomQuizItemId from "utils/Quiz/getRandomQuizItemId.utils";
import FullScreenError from "components/Error/FullScreenError";
import getHostCurrentContainer from "utils/Game/getHostCurrentContainer.utils";

interface HostProps {
  game: Game;
}

export interface GenerateNewQuizItemDataProps {
  quizItemLevel: QuizItemLevel;
  quizItemId: QuizItemId;
}

const Host: React.FC<HostProps> = ({ game }): JSX.Element => {
  const [quizItemLevel, setQuizItemLevel] = React.useState<QuizItemLevel>(
    game.currentQuizItem.level || "beginner",
  );
  const [quizItemId, setQuizItemId] = React.useState<QuizItemId>(
    game.currentQuizItem.quizItemId || getRandomQuizItemId(),
  );

  const { quizItemData, quizLoading, quizError, generateNewQuizItem } = useQuiz(
    {
      game,
      isHost: true,
      quizItemLevel,
      quizItemId,
      resetAnswers: () => setPlayersAnswers({}),
    },
  );

  const handleGenerateNewQuizItemData = ({
    quizItemLevel,
    quizItemId,
  }: GenerateNewQuizItemDataProps): void => {
    setQuizItemLevel(quizItemLevel);
    setQuizItemId(quizItemId);
    generateNewQuizItem();
  };

  const { data: answerData } = useSubscription(PLAYER_ANSWERED, {
    variables: { shortId: game.shortId },
  });

  const [playersAnswers, setPlayersAnswers] = React.useState<
    Record<string, Answer>
  >(
    useCookie({
      prefix: game.shortId,
      cookieName: ECookieName.playersAnswers,
    }) || {},
  );

  React.useEffect(() => {
    if (answerData && quizItemData) {
      const playerId = answerData.playerAnswered.playerId;
      if (playersAnswers[playerId]?.quizId !== quizItemData.quizId) {
        playersAnswers[playerId] = {
          quizId: quizItemData.quizId,
          answer: answerData.playerAnswered.answer,
        };
      }
      setPlayersAnswers({ ...playersAnswers });
      setCookie({
        prefix: game.shortId,
        cookieName: ECookieName.playersAnswers,
        cookieValue: playersAnswers,
      });
    }
  }, [answerData]);

  if (quizError) {
    return (
      <FullScreenError
        errorLabel="Erreur ! Quiz non trouvé."
        link="/"
        linkLabel="Retourner au menu principal"
      />
    );
  }

  return game && !quizLoading && quizItemData ? (
    <FullHeightContainer className="d-flex flex-column align-center">
      <LMNLogo width="400px" margin={`0 0 20px 0`} />
      <GameName gameName={game.name} />
      <StageName gameStage={game.stage} />
      {getHostCurrentContainer({
        game,
        quizItemData,
        playersAnswers,
        handleGenerateNewQuizItemData,
      })}
    </FullHeightContainer>
  ) : (
    <FullHeightContainer className="d-flex justify-center align-center">
      <Loader />
    </FullHeightContainer>
  );
};

export default Host;
