import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";
import { QuizLevel } from "models/Quiz.model";
import { getQuizLevelString } from "utils/quiz/getQuizLevelString.util";
import { AnswerTypePoints } from "./AnswerTypePoints";
import { QuestionNumber } from "utils/quiz/getQuizLevelByQuestionNumber.util";
import { getQuestionNumberColor } from "utils/quiz/getQuestionNumberColor.util";
import { getQuizLevelColor } from "utils/quiz/getQuizLevelColor.util";
import { WaveSeparator } from "./WaveSeparator";

interface QuizItemInfosProps {
  questionNumber: QuestionNumber;
  quizLevel: QuizLevel;
  theme: string;
  subTheme: string;
  showThemeSubTheme: boolean;
}

export const QuizItemInfos: React.FC<QuizItemInfosProps> = ({
  questionNumber,
  quizLevel,
  theme,
  subTheme,
  showThemeSubTheme,
}): JSX.Element => {
  const themeSubThemeRef = React.useRef<HTMLDivElement>(null);
  const questionNumberColor = getQuestionNumberColor({ questionNumber });
  const levelColor = getQuizLevelColor({ quizLevel });
  const quizLevelString = getQuizLevelString({ quizLevel }).toUpperCase();

  return (
    <div className="d-flex flex-column align-center justify-center">
      <QuestionNumberContainer>
        QUESTION <Number color={questionNumberColor}>{questionNumber}</Number> SUR 9
      </QuestionNumberContainer>
      <WaveSeparator />
      <QuestionLevelContainer>
        NIVEAU <QuestionLevel color={levelColor}>{quizLevelString}</QuestionLevel>
      </QuestionLevelContainer>
      <WaveSeparator />
      <ThemeSubThemeWaveWrapper
        height={showThemeSubTheme ? themeSubThemeRef.current?.clientHeight || 0 : 0}
      >
        <ThemeSubThemeWaveContainer
          ref={themeSubThemeRef}
          color={levelColor}
          className="d-flex flex-column align-center justify-center"
        >
          <ThemeSubThemeContainer>
            {theme.toUpperCase()}
            <SubThemeContainer>{subTheme.toUpperCase()}</SubThemeContainer>
          </ThemeSubThemeContainer>
          <WaveSeparator />
        </ThemeSubThemeWaveContainer>
      </ThemeSubThemeWaveWrapper>
      <AnswerTypePoints quizLevel={quizLevel} />
    </div>
  );
};

const QuestionNumberContainer = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 70px;
  line-height: 70px;
  color: ${Styles.darkBlue};
`;

const Number = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  text-shadow: 5px 5px 0 ${Styles.darkBlue};
`;

const QuestionLevelContainer = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 70px;
  line-height: 70px;
  color: ${Styles.darkBlue};
  text-align: center;
`;

const QuestionLevel = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  text-shadow: 5px 5px 0 ${Styles.darkBlue};
`;

const ThemeSubThemeWaveWrapper = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  transition: height 0.5s;
  overflow: hidden;
`;

const ThemeSubThemeWaveContainer = styled.div<{ color: string }>`
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  line-height: 35px;
  color: ${(props) => props.color};
  text-shadow: 2px 2px 0 ${Styles.darkBlue};
`;

const ThemeSubThemeContainer = styled.div`
  text-align: center;
`;

const SubThemeContainer = styled.span`
  color: ${Styles.darkBlue};
  text-shadow: none;
  margin-left: 15px;
`;
