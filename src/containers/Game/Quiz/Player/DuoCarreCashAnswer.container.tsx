import React from "react";

import { AnswerTypeSelection } from "components/Quiz/Player/AnswerTypeSelection";
import { useAnswerTypeChoice } from "hooks/quiz/useAnswerTypeChoice.hook";
import { DuoAnswersIndexes, QuizItemData } from "models/Quiz.model";
import { DuoAnswers } from "components/Quiz/Player/DuoAnswers";
import { CarreAnswers } from "components/Quiz/Player/CarreAnswers";
import { CashAnswer } from "components/Quiz/Player/CashAnswer";
import { AnswerType } from "models/Game.model";
import { FullScreenError } from "components/Utils/FullScreenError";
import { useCurrentAnswer } from "hooks/quiz/useCurrentAnswer.hook";

interface DuoCarreCashAnswerContainerProps {
  shortId: string;
  quizItemData: QuizItemData;
  playerId: string;
  duoAnswersIndexes: DuoAnswersIndexes;
  questionIsOver: boolean;
}

export const DuoCarreCashAnswerContainer: React.FC<DuoCarreCashAnswerContainerProps> = ({
  shortId,
  quizItemData,
  playerId,
  duoAnswersIndexes,
  questionIsOver,
}): JSX.Element => {
  const { answerTypeChoice, setAnswerTypeChoice } = useAnswerTypeChoice({
    shortId,
  });
  const { currentAnswer, setCurrentAnswer } = useCurrentAnswer({
    shortId,
    quizId: quizItemData.quizId,
  });

  if (answerTypeChoice?.quizId !== quizItemData.quizId) {
    return (
      <AnswerTypeSelection
        quizId={quizItemData.quizId}
        questionIsOver={questionIsOver}
        setAnswerTypeChoice={setAnswerTypeChoice}
      />
    );
  }

  if (answerTypeChoice.answerType in AnswerType) {
    return {
      duo: (
        <DuoAnswers
          quizId={quizItemData.quizId}
          choices={duoAnswersIndexes.indexes.map(
            (answerIndex: number) => quizItemData.quiz.choices[answerIndex],
          )}
          playerId={playerId}
          currentAnswer={currentAnswer}
          onClick={setCurrentAnswer}
          questionIsOver={questionIsOver}
        />
      ),
      carre: (
        <CarreAnswers
          quizId={quizItemData.quizId}
          choices={quizItemData.quiz.choices}
          playerId={playerId}
          currentAnswer={currentAnswer}
          onClick={setCurrentAnswer}
          questionIsOver={questionIsOver}
        />
      ),
      cash: (
        <CashAnswer
          quizId={quizItemData.quizId}
          playerId={playerId}
          answer={quizItemData.quiz.answer}
          currentAnswer={currentAnswer}
          onSubmit={setCurrentAnswer}
          questionIsOver={questionIsOver}
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
