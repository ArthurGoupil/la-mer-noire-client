import React from "react";

import EStyles from "constants/Styling.constants";
import { Answer } from "models/Game.model";
import AnswerChoice from "./AnswerChoice";

interface CarreAnswersProps {
  shortId: string;
  quizId: string;
  choices: string[];
  playerId: string;
  questionIsOver: boolean;
  selectedAnswer: Answer | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
}

const CarreAnswers: React.FC<CarreAnswersProps> = ({
  shortId,
  quizId,
  choices,
  playerId,
  questionIsOver,
  selectedAnswer,
  setSelectedAnswer,
}): JSX.Element => {
  return (
    <>
      <AnswerChoice
        color={EStyles.darkBlue}
        quizAnswer={choices[0]}
        shortId={shortId}
        quizId={quizId}
        answerType="carre"
        playerId={playerId}
        questionIsOver={questionIsOver}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.yellow}
        quizAnswer={choices[1]}
        shortId={shortId}
        quizId={quizId}
        answerType="carre"
        playerId={playerId}
        questionIsOver={questionIsOver}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.orange}
        quizAnswer={choices[2]}
        shortId={shortId}
        quizId={quizId}
        answerType="carre"
        playerId={playerId}
        questionIsOver={questionIsOver}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.turquoise}
        quizAnswer={choices[3]}
        shortId={shortId}
        quizId={quizId}
        answerType="carre"
        playerId={playerId}
        questionIsOver={questionIsOver}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
    </>
  );
};

export default CarreAnswers;
