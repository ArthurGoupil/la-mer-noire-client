import React from "react";

import { ECaPasseOuCaCashPoints } from "constants/CaPasseOuCaCash.constants";
import { ECookieName } from "constants/Cookies.constants";
import { CaPasseOuCaCashState, Answer, PlayersPoints, QuestionRecord } from "models/Game.model";
import { QuizItemData, QuizLevel } from "models/Quiz.model";
import { getCookie, setCookie } from "utils/cookies.util";
import { getLevelByQuestionNumber, QuestionNumber } from "utils/quiz/getLevelByQuestionNumber.util";
import { isValidAnswer } from "utils/quiz/isValidAnswer.util";

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
      setCookie({
        prefix: shortId,
        cookieName: ECookieName.caPasseOuCaCashState,
        cookieValue: newCaPasseOuCaCashState,
      });
      setCaPasseOuCaCashState(newCaPasseOuCaCashState);
    };

    const getPlayersPoints = (): PlayersPoints => {
      const playersPoints: PlayersPoints = caPasseOuCaCashState.playersPoints;
      for (let playerId of Object.keys(caPasseOuCaCashState.playersPoints)) {
        playersPoints[playerId].previous = caPasseOuCaCashState.playersPoints[playerId].current;
        const additionalPoints = isValidAnswer({
          answer: quizAnswer,
          givenAnswer: playersAnswers[playerId]?.answer,
        })
          ? ECaPasseOuCaCashPoints[quizLevel][playersAnswers[playerId].answerType]
          : 0;

        playersPoints[playerId].current += additionalPoints;
      }

      return playersPoints;
    };

    switch (caPasseOuCaCashState.stateName) {
      case "quizInfosScreen":
        const quizInfosScreenTimeout = setTimeout(() => {
          updateCaPasseOuCaCashState({
            stateName: "quizInfosScreen_fetchQuizItemData",
          });
        }, 4000);
        return () => clearTimeout(quizInfosScreenTimeout);
      case "quizInfosScreen_fetchQuizItemData":
        updateCaPasseOuCaCashState({
          stateName: "quizInfosScreen_checkQuizIsReady",
        });
        break;
      case "quizInfosScreen_checkQuizIsReady":
        if (
          quizItemData &&
          questionsRecord[quizItemData?.quizItemSignature]?.timestamp &&
          !questionsRecord[quizItemData?.quizItemSignature]?.isDone
        ) {
          updateCaPasseOuCaCashState({
            stateName: "question",
          });
        }
        break;
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
              quizLevel: getLevelByQuestionNumber({ questionNumber }),
              questionNumber,
              stateName: "quizInfosScreen",
            });
          }, 6000);
        } else {
          playersRanking_currentTimeout = setTimeout(() => {
            updateCaPasseOuCaCashState({
              stateName: "roundOver",
            });
          }, 6000);
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
