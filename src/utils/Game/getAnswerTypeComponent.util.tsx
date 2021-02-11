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
  selectedAnswer: Answer | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
}

const getAnswerTypeComponent = ({
  answerType,
  shortId,
  quizItemData,
  duoAnswersIndexes,
  playerId,
  selectedAnswer,
  setSelectedAnswer,
}: GetAnswerTypeComponentProps): JSX.Element => {
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

export default getAnswerTypeComponent;
