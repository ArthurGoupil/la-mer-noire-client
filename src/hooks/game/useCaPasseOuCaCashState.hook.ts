import React from "react";

import { ECaPasseOuCaCashPoints } from "constants/CaPasseOuCaCash.constants";
import { ECookieName } from "constants/Cookies.constants";
import { CaPasseOuCaCashState, Answer, PlayersPoints, QuestionRecord } from "models/Game.model";
import { QuizItemData, QuizLevel } from "models/Quiz.model";
import { getCookie, setCookie } from "utils/cookies.util";
import {
  getQuizLevelByQuestionNumber,
  QuestionNumber,
} from "utils/quiz/getQuizLevelByQuestionNumber.util";

interface UseCaPasseOuCaCashStateProps {
  shortId: string;
  quizItemData: QuizItemData;
  allPlayersHaveAnswered: boolean;
  playersAnswers: Record<string, Answer>;
  quizAnswer: string;
  quizLevel: QuizLevel;
  questionsRecord: Record<string, QuestionRecord>;
}

interface UseCaPasseOuCaCashStateReturn {
  caPasseOuCaCashState: CaPasseOuCaCashState;
}

export const useCaPasseOuCaCashState = ({
  shortId,
  quizItemData,
  allPlayersHaveAnswered,
  playersAnswers,
  quizAnswer,
  quizLevel,
  questionsRecord,
}: UseCaPasseOuCaCashStateProps): UseCaPasseOuCaCashStateReturn => {
  const [caPasseOuCaCashState, setCaPasseOuCaCashState] = React.useState<CaPasseOuCaCashState>(
    getCookie({
      prefix: shortId,
      cookieName: ECookieName.caPasseOuCaCashState,
    }),
  );

  React.useEffect(() => {
    const updateCaPasseOuCaCashState = ({
      stateName,
      quizLevel,
      questionNumber,
      playersPoints,
    }: Partial<CaPasseOuCaCashState>) => {
      const newCaPasseOuCaCashState = {
        stateName: stateName || caPasseOuCaCashState.stateName,
        quizLevel: quizLevel || caPasseOuCaCashState.quizLevel,
        questionNumber: questionNumber || caPasseOuCaCashState.questionNumber,
        playersPoints: playersPoints || caPasseOuCaCashState.playersPoints,
      };
      setCookie<CaPasseOuCaCashState>({
        prefix: shortId,
        cookieName: ECookieName.caPasseOuCaCashState,
        cookieValue: newCaPasseOuCaCashState,
      });
      setCaPasseOuCaCashState(newCaPasseOuCaCashState);
    };

    const getPlayersPoints = (): PlayersPoints => {
      const playersPoints: PlayersPoints = caPasseOuCaCashState.playersPoints;
      for (const playerId of Object.keys(caPasseOuCaCashState.playersPoints)) {
        playersPoints[playerId].previous = caPasseOuCaCashState.playersPoints[playerId].current;
        const additionalPoints = playersAnswers[playerId]?.isGoodAnswer
          ? ECaPasseOuCaCashPoints[quizLevel][playersAnswers[playerId].answerType] +
            (playersAnswers[playerId].isFirstGoodCash ? 1 : 0)
          : 0;

        playersPoints[playerId].current += additionalPoints;
      }

      return playersPoints;
    };

    switch (caPasseOuCaCashState.stateName) {
      case "stageName":
        const stageNameTimeout = setTimeout(() => {
          updateCaPasseOuCaCashState({
            stateName: "quizItemInfos",
          });
        }, 5000);
        return () => clearTimeout(stageNameTimeout);
      case "quizItemInfos":
        const quizItemInfosTimeout = setTimeout(() => {
          updateCaPasseOuCaCashState({
            stateName: "quizItemInfos_fetchQuizItemData",
          });
        }, 1500);
        return () => clearTimeout(quizItemInfosTimeout);
      case "quizItemInfos_fetchQuizItemData":
        updateCaPasseOuCaCashState({
          stateName: "quizItemInfos_checkQuizIsReady",
        });
        break;
      case "quizItemInfos_checkQuizIsReady":
        if (
          quizItemData &&
          questionsRecord[quizItemData?.quizItemSignature]?.timestamp &&
          !questionsRecord[quizItemData?.quizItemSignature]?.isDone
        ) {
          updateCaPasseOuCaCashState({
            stateName: "quizItemInfos_showThemeSubTheme",
          });
        }
        break;
      case "quizItemInfos_showThemeSubTheme":
        const showThemeSubThemeTimeout = setTimeout(() => {
          updateCaPasseOuCaCashState({
            stateName: "question",
          });
        }, 4000);
        return () => clearTimeout(showThemeSubThemeTimeout);
      case "question":
        if (allPlayersHaveAnswered) {
          updateCaPasseOuCaCashState({
            stateName: "questionMustTimeout",
          });
        } else if (questionsRecord[quizItemData?.quizItemSignature]?.isDone) {
          updateCaPasseOuCaCashState({
            stateName: "questionIsTimedOut",
          });
        }
        break;
      case "questionMustTimeout":
        const questionMustTimeoutTimeout = setTimeout(() => {
          updateCaPasseOuCaCashState({
            stateName: "questionSummary",
            playersPoints: getPlayersPoints(),
          });
        }, 2000);
        return () => clearTimeout(questionMustTimeoutTimeout);
      case "questionIsTimedOut":
        const questionIsTimedOutTimeout = setTimeout(() => {
          updateCaPasseOuCaCashState({
            stateName: "questionSummary",
            playersPoints: getPlayersPoints(),
          });
        }, 1000);
        return () => clearTimeout(questionIsTimedOutTimeout);
      case "questionSummary":
        const questionSummaryTimeout = setTimeout(() => {
          updateCaPasseOuCaCashState({
            stateName: "questionSummary_points",
          });
        }, 3000);
        return () => clearTimeout(questionSummaryTimeout);
      case "questionSummary_points":
        const questionSummary_pointsTimeout = setTimeout(() => {
          updateCaPasseOuCaCashState({
            stateName: "playersRanking_previous",
          });
        }, 7000);
        return () => clearTimeout(questionSummary_pointsTimeout);
      case "playersRanking_previous":
        const playersRanking_previousTimeout = setTimeout(() => {
          updateCaPasseOuCaCashState({
            stateName: "playersRanking_current",
          });
        }, 3000);
        return () => clearTimeout(playersRanking_previousTimeout);
      case "playersRanking_current":
        let playersRanking_currentTimeout: NodeJS.Timeout;
        if (caPasseOuCaCashState.questionNumber < 9) {
          playersRanking_currentTimeout = setTimeout(() => {
            const questionNumber = (caPasseOuCaCashState.questionNumber + 1) as QuestionNumber;
            updateCaPasseOuCaCashState({
              quizLevel: getQuizLevelByQuestionNumber({ questionNumber }),
              questionNumber,
              stateName: "quizItemInfos",
            });
          }, 5000);
        }
        return () => clearTimeout(playersRanking_currentTimeout);
    }
  }, [
    shortId,
    caPasseOuCaCashState,
    quizItemData,
    allPlayersHaveAnswered,
    questionsRecord,
    quizAnswer,
    playersAnswers,
    quizLevel,
  ]);

  return { caPasseOuCaCashState };
};
