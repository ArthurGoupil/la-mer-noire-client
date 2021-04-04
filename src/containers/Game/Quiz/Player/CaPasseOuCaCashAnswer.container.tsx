import React from "react";

import { AnswerTypeSelection } from "components/Quiz/Player/AnswerTypeSelection";
import { useAnswerTypeChoice } from "hooks/quiz/useAnswerTypeChoice.hook";
import { DuoAnswersIndexes, QuizItemData } from "models/Quiz.model";
import { DuoAnswers } from "components/Quiz/Player/DuoAnswers";
import { CarreAnswers } from "components/Quiz/Player/CarreAnswers";
import { CashAnswer } from "components/Quiz/Player/CashAnswer";
import { Game } from "models/Game.model";
import { useCurrentAnswer } from "hooks/quiz/useCurrentAnswer.hook";
import { useNonNullQuizItemData } from "hooks/quiz/useNonNullQuizItemData.hook";
import { usePlayersAnswers } from "hooks/quiz/usePlayersAnswers.hook";
import { AnswerType } from "constants/AnswerType.constants";
import { FullHeightWithWaves } from "components/Quiz/Host/FullHeightWithWaves";
import { getQuizLevelGradient } from "utils/quiz/getQuizLevelGradient.util";
import { LMNLogo } from "components/Utils/LMNLogo";
import { FullScreenError } from "components/Utils/FullScreenError";

interface CaPasseOuCaCashAnswerContainerProps {
  game: Game;
  quizItemData: QuizItemData;
  duoAnswersIndexes: DuoAnswersIndexes;
  playerId: string;
}

type ContainerStatus = "answerType" | "answer" | "error";

export const CaPasseOuCaCashAnswerContainer: React.FC<CaPasseOuCaCashAnswerContainerProps> = ({
  game,
  quizItemData,
  duoAnswersIndexes,
  playerId,
}): JSX.Element => {
  const { answerTypeChoice, setAnswerTypeChoice } = useAnswerTypeChoice({
    shortId: game.shortId,
  });

  const { nonNullQuizItemData } = useNonNullQuizItemData({ quizItemData });

  const { currentAnswer, setCurrentAnswer } = useCurrentAnswer({
    shortId: game.shortId,
    quizItemSignature: nonNullQuizItemData.quizItemSignature,
  });

  usePlayersAnswers({
    shortId: game.shortId,
    quizItemSignature: quizItemData?.quizItemSignature,
    players: game.players,
    quizAnswer: nonNullQuizItemData.quiz.answer,
    playerId,
  });

  const getContainerStatus = (): ContainerStatus => {
    if (answerTypeChoice?.quizItemSignature !== nonNullQuizItemData.quizItemSignature) {
      return "answerType";
    } else if (answerTypeChoice?.answerType in AnswerType) {
      return "answer";
    } else {
      return "error";
    }
  };

  return (
    <>
      {
        {
          answerType: (
            <AnswerTypeSelection
              quizItemSignature={nonNullQuizItemData.quizItemSignature}
              playerCanAnswer={game?.currentQuizItem?.playersCanAnswer}
              setAnswerTypeChoice={setAnswerTypeChoice}
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
          }[answerTypeChoice?.answerType],
          error: (
            <FullScreenError
              errorLabel={`Erreur de type "unknown answer type".`}
              link="/"
              linkLabel="Revenir au menu principal"
            />
          ),
        }[getContainerStatus()]
      }
      <FullHeightWithWaves
        wavesBackgroundGradient={getQuizLevelGradient({ quizLevel: nonNullQuizItemData.level })}
        opacity={game?.currentQuizItem?.playersCanAnswer ? 0 : 1}
      >
        <LMNLogo width="100%" />
      </FullHeightWithWaves>
    </>
  );
};
