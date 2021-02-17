import React from "react";

import { FullWidthContainer } from "components/Utils/FullWidthContainer";
import { CategoryTheme } from "components/Quiz/Host/CategoryTheme";
import { QuestionDisplay } from "components/Quiz/Host/Question";
import { Game, PlayerData } from "models/Game.model";
import { isValidAnswer } from "utils/quiz/isValidAnswer.util";
import { TimeBar } from "components/Quiz/Others/TimeBar";
import { PlayerAnswer } from "components/Quiz/Host/PlayerAnswer";
import { useQuizLifetime } from "hooks/quiz/useQuizLifetime.hook";
import { useMutation } from "@apollo/client";
import {
  GENERATE_NEW_CURRENT_QUIZ_ITEM,
  GET_GAME,
} from "services/games.service";
import { error, loading, ready } from "constants/NetworkStatuses.constants";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";
import { FullScreenError } from "components/Utils/FullScreenError";
import { QuizItemData } from "models/Quiz.model";
import { getNS } from "utils/networkStatus.util";
import { usePlayersAnswers } from "hooks/quiz/usePlayersAnswers.hook";
import { EQuizDuration } from "constants/QuizDuration.constants";

interface CaPasseOuCaCashContainerProps {
  game: Game;
  quizItemData: QuizItemData;
}

export const CaPasseOuCaCashContainer: React.FC<CaPasseOuCaCashContainerProps> = ({
  game,
  quizItemData,
}): JSX.Element => {
  const { playersAnswers, allPlayersHaveAnswered } = usePlayersAnswers({
    shortId: game.shortId,
    quizItemData,
    players: game.players,
  });

  const { remainingTime, doneQuestionsRecord, networkStatus } = useQuizLifetime(
    {
      shortId: game.shortId,
      quizId: quizItemData.quizId,
      allPlayersHaveAnswered,
      timestampReference: quizItemData.createdAtTimestamp,
      duration: EQuizDuration.caPasseOuCaCash,
    },
  );

  const [generateNewCurrentQuizItem] = useMutation(
    GENERATE_NEW_CURRENT_QUIZ_ITEM,
    {
      refetchQueries: [
        {
          query: GET_GAME,
          variables: { shortId: game.shortId },
        },
      ],
    },
  );

  React.useEffect(() => {
    if (doneQuestionsRecord[quizItemData.quizId]) {
      setTimeout(() => {
        (async () =>
          await generateNewCurrentQuizItem({
            variables: { shortId: game.shortId, level: "beginner" },
          }))();
      }, 3000);
    }
  }, [doneQuestionsRecord]);

  return {
    [ready]: (
      <FullWidthContainer className="d-flex flex-column align-center space-between flex-grow">
        <div className="d-flex flex-column align-center justify-center flex-grow">
          <QuestionDisplay quizItem={quizItemData.quiz} showAnswers={false} />
          <div className="d-flex">
            {game.players.map((playerData: PlayerData, index: number) => {
              return (
                <PlayerAnswer
                  key={index}
                  playerName={playerData.player.name}
                  answerType={playersAnswers[playerData.player._id]?.answerType}
                  isGoodAnswer={isValidAnswer({
                    answer: quizItemData.quiz.answer,
                    givenAnswer: playersAnswers[playerData.player._id]?.answer,
                  })}
                  noMarginRight={index === game.players.length - 1}
                  questionIsOver={doneQuestionsRecord[quizItemData.quizId]}
                />
              );
            })}
          </div>
          {doneQuestionsRecord[quizItemData.quizId] && quizItemData.quiz.answer}
        </div>
        <CategoryTheme
          categoryName={quizItemData.category.name}
          theme={quizItemData.theme}
          subTheme={quizItemData.subTheme}
        />
        <TimeBar
          totalTime={EQuizDuration.caPasseOuCaCash}
          remainingTime={remainingTime}
          allPlayersHaveAnswered={allPlayersHaveAnswered}
          isHost
        />
      </FullWidthContainer>
    ),
    [loading]: <FullHeightLoader />,
    [error]: (
      <FullScreenError errorLabel="Erreur de communication avec le serveur. Veuillez recharger la page." />
    ),
  }[getNS(networkStatus)];
};
