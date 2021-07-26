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
  onClick: (value: SetCurrentAnswerProps) => void;
  playerCanAnswer: boolean;
  correctAnswer?: string;
}

export const CarreAnswers: React.FC<CarreAnswersProps> = ({
  quizItemSignature,
  choices,
  playerId,
  currentAnswer,
  onClick,
  playerCanAnswer,
  correctAnswer,
}): JSX.Element => {
  return (
    <>
      <AnswerChoice
        color={Styles.darkBlue}
        choice={choices[0]}
        quizItemSignature={quizItemSignature}
        answerType={AnswerType.carre}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        playerCanAnswer={playerCanAnswer}
        correctAnswer={correctAnswer}
      />
      <AnswerChoice
        color={Styles.yellow}
        choice={choices[1]}
        quizItemSignature={quizItemSignature}
        answerType={AnswerType.carre}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        playerCanAnswer={playerCanAnswer}
        correctAnswer={correctAnswer}
      />
      <AnswerChoice
        color={Styles.redOrange}
        choice={choices[2]}
        quizItemSignature={quizItemSignature}
        answerType={AnswerType.carre}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        playerCanAnswer={playerCanAnswer}
        correctAnswer={correctAnswer}
      />
      <AnswerChoice
        color={Styles.turquoise}
        choice={choices[3]}
        quizItemSignature={quizItemSignature}
        answerType={AnswerType.carre}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        playerCanAnswer={playerCanAnswer}
        correctAnswer={correctAnswer}
      />
    </>
  );
};
