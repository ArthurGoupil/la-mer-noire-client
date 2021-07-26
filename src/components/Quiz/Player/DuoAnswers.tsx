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
}

export const DuoAnswers: React.FC<CarreAnswersProps> = ({
  quizItemSignature,
  choices,
  playerId,
  currentAnswer,
  onClick,
  playerCanAnswer,
}): JSX.Element => {
  return (
    <>
      <AnswerChoice
        color={Styles.darkBlue}
        choice={choices[0]}
        answerType={AnswerType.duo}
        quizItemSignature={quizItemSignature}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        playerCanAnswer={playerCanAnswer}
      />
      <AnswerChoice
        color={Styles.yellow}
        choice={choices[1]}
        answerType={AnswerType.duo}
        quizItemSignature={quizItemSignature}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={onClick}
        playerCanAnswer={playerCanAnswer}
      />
    </>
  );
};
