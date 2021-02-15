import React from "react";

import { EStyles } from "constants/Styling.constants";
import { AnswerChoice } from "./AnswerChoice";
import { AnswerType } from "models/Game.model";

interface CarreAnswersProps {
  shortId: string;
  quizId: string;
  choices: string[];
  playerId: string;
  questionIsOver: boolean;
}

export const DuoAnswers: React.FC<CarreAnswersProps> = ({
  shortId,
  quizId,
  choices,
  playerId,
  questionIsOver,
}): JSX.Element => {
  return (
    <>
      <AnswerChoice
        color={EStyles.darkBlue}
        quizAnswer={choices[0]}
        shortId={shortId}
        answerType={AnswerType.duo}
        quizId={quizId}
        playerId={playerId}
        questionIsOver={questionIsOver}
      />
      <AnswerChoice
        color={EStyles.yellow}
        quizAnswer={choices[1]}
        shortId={shortId}
        answerType={AnswerType.duo}
        quizId={quizId}
        playerId={playerId}
        questionIsOver={questionIsOver}
      />
    </>
  );
};
