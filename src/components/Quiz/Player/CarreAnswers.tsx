import React from "react";

import { EStyles } from "constants/Styling.constants";
import { AnswerChoice } from "./AnswerChoice";
import { Answer, AnswerType } from "models/Game.model";
import { SetCurrentAnswerProps } from "hooks/quiz/useCurrentAnswer.hook";

interface CarreAnswersProps {
  quizItemSignature: string;
  choices: string[];
  playerId: string;
  currentAnswer: Answer | null;
  onClick: (value: SetCurrentAnswerProps) => Promise<void>;
  questionIsOver: boolean;
}

export const CarreAnswers: React.FC<CarreAnswersProps> = ({
  quizItemSignature,
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
        quizItemSignature={quizItemSignature}
        answerType={AnswerType.carre}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        questionIsOver={questionIsOver}
      />
      <AnswerChoice
        color={EStyles.yellow}
        quizAnswer={choices[1]}
        quizItemSignature={quizItemSignature}
        answerType={AnswerType.carre}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        questionIsOver={questionIsOver}
      />
      <AnswerChoice
        color={EStyles.redOrange}
        quizAnswer={choices[2]}
        quizItemSignature={quizItemSignature}
        answerType={AnswerType.carre}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        questionIsOver={questionIsOver}
      />
      <AnswerChoice
        color={EStyles.turquoise}
        quizAnswer={choices[3]}
        quizItemSignature={quizItemSignature}
        answerType={AnswerType.carre}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        questionIsOver={questionIsOver}
      />
    </>
  );
};
