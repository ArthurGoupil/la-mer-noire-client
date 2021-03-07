import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { QuizLevel } from "models/Quiz.model";
import { getQuizLevelString } from "utils/quiz/getQuizLevelString.util";
import { AnswerTypePoints } from "./AnswerTypePoints";
import { QuestionNumber } from "utils/quiz/getQuizLevelByQuestionNumber.util";
import { getQuestionNumberColor } from "utils/quiz/getQuestionNumberColor.util";
import { getQuizLevelColor } from "utils/quiz/getQuizLevelColor.util";
import { WaveSeparator } from "./WaveSeparator";

interface QuizInfosScreenProps {
  questionNumber: QuestionNumber;
  quizLevel: QuizLevel;
}

export const QuizInfosScreen: React.FC<QuizInfosScreenProps> = ({
  questionNumber,
  quizLevel,
}): JSX.Element => {
  return (
    <div className="d-flex flex-column align-center justify-center">
      <QuestionNumberContainer>
        QUESTION{" "}
        <Number color={getQuestionNumberColor({ questionNumber })}>{questionNumber}</Number> SUR 9
      </QuestionNumberContainer>
      <WaveSeparator />
      <QuestionLevelContainer>
        NIVEAU{" "}
        <QuestionLevel color={getQuizLevelColor({ quizLevel })}>
          {getQuizLevelString({ quizLevel }).toUpperCase()}
        </QuestionLevel>
      </QuestionLevelContainer>
      <WaveSeparator />
      <AnswerTypePoints quizLevel={quizLevel} />
    </div>
  );
};

const QuestionNumberContainer = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 70px;
  line-height: 70px;
  color: ${EStyles.darkBlue};
`;

const Number = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  text-shadow: 5px 5px 0 ${EStyles.darkBlue};
`;

const QuestionLevelContainer = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 70px;
  line-height: 70px;
  color: ${EStyles.darkBlue};
`;

const QuestionLevel = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  text-shadow: 5px 5px 0 ${EStyles.darkBlue};
`;
