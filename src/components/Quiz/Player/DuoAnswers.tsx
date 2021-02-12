import React from "react";

import EStyles from "constants/Styling.constants";
import AnswerChoice from "./AnswerChoice";
import { Answer } from "models/Game.model";

interface CarreAnswersProps {
  shortId: string;
  quizId: string;
  choices: string[];
  playerId: string;
  questionIsOver: boolean;
  selectedAnswer: Answer | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
}

const DuoAnswers: React.FC<CarreAnswersProps> = ({
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
        answerType="duo"
        quizId={quizId}
        playerId={playerId}
        questionIsOver={questionIsOver}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.yellow}
        quizAnswer={choices[1]}
        shortId={shortId}
        answerType="duo"
        quizId={quizId}
        playerId={playerId}
        questionIsOver={questionIsOver}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
    </>
  );
};

export default DuoAnswers;
