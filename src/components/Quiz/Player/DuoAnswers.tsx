import React from "react";

import { Styles } from "constants/Styling.constants";
import { AnswerChoice } from "./AnswerChoice";
import { CurrentAnswer } from "models/Game.model";
import { SetCurrentAnswerProps } from "hooks/quiz/useCurrentAnswer.hook";
import { AnswerType } from "constants/AnswerType.constants";

interface CarreAnswersProps {
  quizItemSignature: string;
  choices: string[];
  playerId: string;
  currentAnswer: CurrentAnswer | null;
  onClick: (value: SetCurrentAnswerProps) => Promise<void>;
  questionIsOver: boolean;
}

export const DuoAnswers: React.FC<CarreAnswersProps> = ({
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
        color={Styles.darkBlue}
        quizAnswer={choices[0]}
        answerType={AnswerType.duo}
        quizItemSignature={quizItemSignature}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        questionIsOver={questionIsOver}
      />
      <AnswerChoice
        color={Styles.yellow}
        quizAnswer={choices[1]}
        answerType={AnswerType.duo}
        quizItemSignature={quizItemSignature}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        questionIsOver={questionIsOver}
      />
    </>
  );
};
