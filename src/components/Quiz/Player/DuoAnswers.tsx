import React from "react";

import EStyles from "constants/Styling.constants";
import AnswerChoice from "./AnswerChoice";
import { Answer } from "models/Game";

interface CarreAnswersProps {
  shortId: string;
  quizId: string;
  choices: string[];
  playerId: string;
  selectedAnswer: Answer | null;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
}

const DuoAnswers: React.FC<CarreAnswersProps> = ({
  shortId,
  quizId,
  choices,
  playerId,
  selectedAnswer,
  setSelectedAnswer,
}): JSX.Element => {
  return (
    <>
      <AnswerChoice
        color={EStyles.darkBlue}
        answer={choices[0]}
        shortId={shortId}
        quizId={quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.yellow}
        answer={choices[1]}
        shortId={shortId}
        quizId={quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
    </>
  );
};

export default DuoAnswers;
