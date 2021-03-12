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

  usePlayersAnswers({
    shortId: game.shortId,
    quizItemSignature: quizItemData?.quizItemSignature,
    players: game.players,
    quizAnswer: nonNullQuizItemData.quiz.answer,
    playerId,
  });

  if (answerTypeChoice?.quizItemSignature !== nonNullQuizItemData.quizItemSignature) {
    return (
      <AnswerTypeSelection
        quizItemSignature={nonNullQuizItemData.quizItemSignature}
        questionIsOver={false}
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
          questionIsOver={false}
        />
      ),
      carre: (
        <CarreAnswers
          quizItemSignature={nonNullQuizItemData.quizItemSignature}
          choices={nonNullQuizItemData.quiz.choices}
          playerId={playerId}
          currentAnswer={currentAnswer}
          onClick={setCurrentAnswer}
          questionIsOver={false}
        />
      ),
      cash: (
        <CashAnswer
          quizItemSignature={nonNullQuizItemData.quizItemSignature}
          playerId={playerId}
          answer={nonNullQuizItemData.quiz.answer}
          currentAnswer={currentAnswer}
          onSubmit={setCurrentAnswer}
          questionIsOver={false}
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
