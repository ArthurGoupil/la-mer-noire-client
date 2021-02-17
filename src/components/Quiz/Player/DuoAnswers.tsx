import React from "react";

import { EStyles } from "constants/Styling.constants";
import { AnswerChoice } from "./AnswerChoice";
import { Answer, AnswerType } from "models/Game.model";
import { SetCurrentAnswerProps } from "hooks/quiz/useCurrentAnswer.hook";

interface CarreAnswersProps {
  quizId: string;
  choices: string[];
  playerId: string;
  currentAnswer: Answer | null;
  onClick: (value: SetCurrentAnswerProps) => Promise<void>;
  questionIsOver: boolean;
}

export const DuoAnswers: React.FC<CarreAnswersProps> = ({
  quizId,
  choices,
  playerId,
  currentAnswer,
  onClick,
  questionIsOver,
}): JSX.Element => {
  return (
    <>
      <AnswerChoice
        color={EStyles.darkBlue}
        quizAnswer={choices[0]}
        answerType={AnswerType.duo}
        quizId={quizId}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        questionIsOver={questionIsOver}
      />
      <AnswerChoice
        color={EStyles.yellow}
        quizAnswer={choices[1]}
        answerType={AnswerType.duo}
        quizId={quizId}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        questionIsOver={questionIsOver}
      />
    </>
  );
};
