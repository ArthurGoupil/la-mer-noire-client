import React from "react";
import CarreAnswers from "components/Quiz/Player/CarreAnswers";
import CashAnswer from "components/Quiz/Player/CashAnswer";
import DuoAnswers from "components/Quiz/Player/DuoAnswers";
import { Answer } from "models/Game.model";
import { DuoAnswersIndexes, QuizItemData } from "models/Quiz.model";
import FullScreenError from "components/Utils/FullScreenError";

interface GetAnswerTypeComponentProps {
  shortId: string;
  playerId: string;
  answerType: string;
  quizItemData: QuizItemData;
  duoAnswersIndexes: DuoAnswersIndexes;
  questionIsOver: boolean;
  selectedAnswer: Answer | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
}

const AnswerDisplay: React.FC<GetAnswerTypeComponentProps> = ({
  shortId,
  playerId,
  answerType,
  quizItemData,
  duoAnswersIndexes,
  questionIsOver,
  selectedAnswer,
  setSelectedAnswer,
}) => {
  switch (answerType) {
    case "duo":
      return (
        <DuoAnswers
          shortId={shortId}
          quizId={quizItemData.quizId}
          choices={duoAnswersIndexes.indexes.map(
            (answerIndex: number) => quizItemData.quiz.choices[answerIndex],
          )}
          playerId={playerId}
          questionIsOver={questionIsOver}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
      );
    case "carre":
      return (
        <CarreAnswers
          shortId={shortId}
          quizId={quizItemData.quizId}
          choices={quizItemData.quiz.choices}
          playerId={playerId}
          questionIsOver={questionIsOver}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
      );
    case "cash":
      return (
        <CashAnswer
          shortId={shortId}
          quizId={quizItemData.quizId}
          playerId={playerId}
          answer={quizItemData.quiz.answer}
          questionIsOver={questionIsOver}
          setSelectedAnswer={setSelectedAnswer}
        />
      );
  }
  return (
    <FullScreenError
      errorLabel={`Erreur de type "unknown answer type choice."`}
      link="/"
      linkLabel="Revenir au menu principal"
    />
  );
};

export default AnswerDisplay;
