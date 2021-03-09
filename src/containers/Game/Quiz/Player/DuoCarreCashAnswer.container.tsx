import React from "react";

import { AnswerTypeSelection } from "components/Quiz/Player/AnswerTypeSelection";
import { useAnswerTypeChoice } from "hooks/quiz/useAnswerTypeChoice.hook";
import { DuoAnswersIndexes, QuizItemData } from "models/Quiz.model";
import { DuoAnswers } from "components/Quiz/Player/DuoAnswers";
import { CarreAnswers } from "components/Quiz/Player/CarreAnswers";
import { CashAnswer } from "components/Quiz/Player/CashAnswer";
import { AnswerType, Game } from "models/Game.model";
import { FullScreenError } from "components/Utils/FullScreenError";
import { useCurrentAnswer } from "hooks/quiz/useCurrentAnswer.hook";
import { useNonNullQuizItemData } from "hooks/quiz/useNonNullQuizItemData.hook";
import { usePlayersAnswers } from "hooks/quiz/usePlayersAnswers.hook";
import { EQuizDuration } from "constants/QuizDuration.constants";
import { useQuizLifetime } from "hooks/quiz/useQuizLifetime.hook";

interface DuoCarreCashAnswerContainerProps {
  game: Game;
  quizItemData: QuizItemData;
  duoAnswersIndexes: DuoAnswersIndexes;
  playerId: string;
}

export const DuoCarreCashAnswerContainer: React.FC<DuoCarreCashAnswerContainerProps> = ({
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

  const { allPlayersHaveAnswered } = usePlayersAnswers({
    shortId: game.shortId,
    quizItemSignature: nonNullQuizItemData.quizItemSignature,
    players: game.players,
    quizAnswer: nonNullQuizItemData.quiz.answer,
    playerId
  });

  const { questionsRecord } = useQuizLifetime({
    shortId: game.shortId,
    quizItemSignature: nonNullQuizItemData.quizItemSignature,
    allPlayersHaveAnswered,
    duration: EQuizDuration.caPasseOuCaCash,
  });

  if (answerTypeChoice?.quizItemSignature !== nonNullQuizItemData.quizItemSignature) {
    return (
      <AnswerTypeSelection
        quizItemSignature={nonNullQuizItemData.quizItemSignature}
        questionIsOver={questionsRecord[nonNullQuizItemData.quizItemSignature]?.isDone}
        setAnswerTypeChoice={setAnswerTypeChoice}
      />
    );
  }

  if (answerTypeChoice.answerType in AnswerType) {
    return {
      duo: (
        <DuoAnswers
          quizItemSignature={nonNullQuizItemData.quizItemSignature}
          choices={duoAnswersIndexes.indexes.map(
            (answerIndex: number) => nonNullQuizItemData.quiz.choices[answerIndex],
          )}
          playerId={playerId}
          currentAnswer={currentAnswer}
          onClick={setCurrentAnswer}
          questionIsOver={questionsRecord[nonNullQuizItemData.quizItemSignature]?.isDone}
        />
      ),
      carre: (
        <CarreAnswers
          quizItemSignature={nonNullQuizItemData.quizItemSignature}
          choices={nonNullQuizItemData.quiz.choices}
          playerId={playerId}
          currentAnswer={currentAnswer}
          onClick={setCurrentAnswer}
          questionIsOver={questionsRecord[nonNullQuizItemData.quizItemSignature]?.isDone}
        />
      ),
      cash: (
        <CashAnswer
          quizItemSignature={nonNullQuizItemData.quizItemSignature}
          playerId={playerId}
          answer={nonNullQuizItemData.quiz.answer}
          currentAnswer={currentAnswer}
          onSubmit={setCurrentAnswer}
          questionIsOver={questionsRecord[nonNullQuizItemData.quizItemSignature]?.isDone}
        />
      ),
    }[answerTypeChoice.answerType];
  }

  return (
    <FullScreenError
      errorLabel={`Erreur de type "unknown answer type".`}
      link="/"
      linkLabel="Revenir au menu principal"
    />
  );
};
