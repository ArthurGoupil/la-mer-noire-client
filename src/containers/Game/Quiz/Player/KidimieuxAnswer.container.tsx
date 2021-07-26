import React from "react";

import { AnswerTypeSelection } from "components/Quiz/Player/AnswerTypeSelection";
import { useBuzzAnswerTypeChoice } from "hooks/quiz/useBuzzAnswerTypeChoice.hook";
import { DuoAnswersIndexes, QuizItemData } from "models/Quiz.model";
import { DuoAnswers } from "components/Quiz/Player/DuoAnswers";
import { CarreAnswers } from "components/Quiz/Player/CarreAnswers";
import { CashAnswer } from "components/Quiz/Player/CashAnswer";
import { Game } from "models/Game.model";
import { useCurrentAnswer } from "hooks/quiz/useCurrentAnswer.hook";
import { useNonNullQuizItemData } from "hooks/quiz/useNonNullQuizItemData.hook";
import { FullHeightWithWaves } from "components/Quiz/Host/FullHeightWithWaves";
import { getQuizLevelGradient } from "utils/quiz/getQuizLevelGradient.util";
import { LMNLogo } from "components/Utils/LMNLogo";
import { FullScreenError } from "components/Utils/FullScreenError";
import { usePlayersBuzz } from "hooks/quiz/usePlayersBuzz.hook";
import { AnswerType } from "constants/AnswerType.constants";
import { usePlayersAnswers } from "hooks/quiz/usePlayersAnswers.hook";

interface KidimieuxAnswerContainerProps {
  game: Game;
  quizItemData: QuizItemData;
  duoAnswersIndexes: DuoAnswersIndexes;
  playerId: string;
}

type ContainerStatus = "answerTypeBuzz" | "answer" | "other";

export const KidimieuxAnswerContainer: React.FC<KidimieuxAnswerContainerProps> = ({
  game,
  quizItemData,
  duoAnswersIndexes,
  playerId,
}): JSX.Element => {
  const { nonNullQuizItemData } = useNonNullQuizItemData({ quizItemData });

  const { buzzAnswerTypeChoice, setBuzzAnswerTypeChoice } = useBuzzAnswerTypeChoice({
    shortId: game.shortId,
    playerId,
    quizItemSignature: nonNullQuizItemData.quizItemSignature,
  });

  const { currentAnswer, setCurrentAnswer } = useCurrentAnswer({
    shortId: game.shortId,
    quizItemSignature: nonNullQuizItemData.quizItemSignature,
  });

  const { playersBuzz } = usePlayersBuzz({
    shortId: game.shortId,
    quizItemSignature: quizItemData?.quizItemSignature,
    players: game.players,
    canBuzz: game.currentQuizItem.playersCanBuzz,
  });

  usePlayersAnswers({
    shortId: game.shortId,
    quizItemSignature: quizItemData?.quizItemSignature,
    players: game.players,
    correctAnswer: nonNullQuizItemData.quiz.answer,
    playerId,
  });

  const getContainerStatus = (): ContainerStatus => {
    if (
      game?.currentQuizItem?.playersCanAnswer &&
      game.currentQuizItem.currentPlayers.includes(playerId)
    ) {
      return "answer";
    } else if (game?.currentQuizItem?.playersCanBuzz) {
      return "answerTypeBuzz";
    } else {
      return "other";
    }
  };

  const selectedAnswerType = playersBuzz[playerId]?.answer as AnswerType;

  const hideDuo = Object.keys(playersBuzz).some(
    (buzzPlayerId) =>
      buzzPlayerId !== playerId &&
      (playersBuzz[buzzPlayerId].answer === "duo" || playersBuzz[buzzPlayerId].answer === "carre"),
  );
  const hideCarre = Object.keys(playersBuzz).some(
    (buzzPlayerId) => buzzPlayerId !== playerId && playersBuzz[buzzPlayerId].answer === "carre",
  );

  const wavesBackgroundOpacity =
    (game?.currentQuizItem?.playersCanAnswer &&
      game.currentQuizItem.currentPlayers.includes(playerId)) ||
    game?.currentQuizItem?.playersCanBuzz
      ? 0
      : 1;

  return (
    <>
      {
        {
          answerTypeBuzz: (
            <AnswerTypeSelection
              quizItemSignature={nonNullQuizItemData.quizItemSignature}
              playerCanAnswer={game?.currentQuizItem?.playersCanBuzz && !playersBuzz[playerId]}
              setAnswerTypeChoice={setBuzzAnswerTypeChoice}
              isBuzz
              selectedAnswerType={selectedAnswerType}
              disableDuo={hideDuo}
              disableCarre={hideCarre}
            />
          ),
          answer: {
            duo: (
              <DuoAnswers
                quizItemSignature={nonNullQuizItemData.quizItemSignature}
                choices={duoAnswersIndexes.indexes.map(
                  (answerIndex: number) => nonNullQuizItemData.quiz.choices[answerIndex],
                )}
                playerId={playerId}
                currentAnswer={currentAnswer}
                onClick={setCurrentAnswer}
                playerCanAnswer={game?.currentQuizItem?.playersCanAnswer}
              />
            ),
            carre: (
              <CarreAnswers
                quizItemSignature={nonNullQuizItemData.quizItemSignature}
                choices={nonNullQuizItemData.quiz.choices}
                playerId={playerId}
                currentAnswer={currentAnswer}
                onClick={setCurrentAnswer}
                playerCanAnswer={game?.currentQuizItem?.playersCanAnswer}
              />
            ),
            cash: (
              <CashAnswer
                quizItemSignature={nonNullQuizItemData.quizItemSignature}
                playerId={playerId}
                answer={nonNullQuizItemData.quiz.answer}
                currentAnswer={currentAnswer}
                onSubmit={setCurrentAnswer}
                playerCanAnswer={game?.currentQuizItem?.playersCanAnswer}
              />
            ),
            buzz: (
              <FullScreenError
                errorLabel={`Erreur de type "no buzz allowed".`}
                link="/"
                linkLabel="Revenir au menu principal"
              />
            ),
          }[buzzAnswerTypeChoice?.answerType],
          other: <div />,
        }[getContainerStatus()]
      }
      <FullHeightWithWaves
        wavesBackgroundGradient={getQuizLevelGradient({ quizLevel: nonNullQuizItemData.level })}
        opacity={wavesBackgroundOpacity}
      >
        <LMNLogo width="100%" />
      </FullHeightWithWaves>
    </>
  );
};
