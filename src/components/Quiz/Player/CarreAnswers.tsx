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
        color={Styles.darkBlue}
        quizAnswer={choices[0]}
        quizItemSignature={quizItemSignature}
        answerType={AnswerType.carre}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        questionIsOver={questionIsOver}
      />
      <AnswerChoice
        color={Styles.yellow}
        quizAnswer={choices[1]}
        quizItemSignature={quizItemSignature}
        answerType={AnswerType.carre}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        questionIsOver={questionIsOver}
      />
      <AnswerChoice
        color={Styles.redOrange}
        quizAnswer={choices[2]}
        quizItemSignature={quizItemSignature}
        answerType={AnswerType.carre}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        questionIsOver={questionIsOver}
      />
      <AnswerChoice
        color={Styles.turquoise}
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
