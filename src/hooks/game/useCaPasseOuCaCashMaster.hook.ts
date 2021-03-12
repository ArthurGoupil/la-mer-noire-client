import React from "react";

import { ECaPasseOuCaCashPoints } from "constants/CaPasseOuCaCash.constants";
import { ECookieName } from "constants/Cookies.constants";
import { CaPasseOuCaCashMaster, Answer, PlayersPoints, QuestionRecord } from "models/Game.model";
import { QuizItemData, QuizLevel } from "models/Quiz.model";
import { getCookie, setCookie } from "utils/cookies.util";
import {
  getQuizLevelByQuestionNumber,
  QuestionNumber,
} from "utils/quiz/getQuizLevelByQuestionNumber.util";
import { useQuizLifetime } from "hooks/quiz/useQuizLifetime.hook";
import { EQuizDuration } from "constants/QuizDuration.constants";
import { useSound } from "hooks/others/useSound.hook";
import { ESounds } from "constants/Sounds.constants";

interface UseCaPasseOuCaCashMasterProps {
  shortId: string;
  quizItemData: QuizItemData;
  allPlayersHaveAnswered: boolean;
  playersAnswers: Record<string, Answer>;
  quizItemSignature: string;
  quizLevel: QuizLevel;
}

interface UseCaPasseOuCaCashMasterReturn {
  caPasseOuCaCashMaster: CaPasseOuCaCashMaster;
  questionsRecord: Record<string, QuestionRecord>;
  remainingTime: number | null;
}

export const useCaPasseOuCaCashMaster = ({
  shortId,
  quizItemData,
  allPlayersHaveAnswered,
  playersAnswers,
  quizItemSignature,
  quizLevel,
}: UseCaPasseOuCaCashMasterProps): UseCaPasseOuCaCashMasterReturn => {
  const [caPasseOuCaCashMaster, setCaPasseOuCaCashMaster] = React.useState<CaPasseOuCaCashMaster>(
    getCookie({
      prefix: shortId,
      cookieName: ECookieName.caPasseOuCaCashMaster,
    }),
  );

  const {
    play: quizBackgroundSoundPlay,
    fadeOutAndStop: quizBackgroundSoundFadeOutAndStop,
    isPlaying: quizBackgroundSoundisPlaying,
  } = useSound({ sound: ESounds.quizBackground });

  const { remainingTime, questionsRecord } = useQuizLifetime({
    shortId,
    quizItemSignature,
    allPlayersHaveAnswered,
    duration: EQuizDuration.caPasseOuCaCash,
    shouldFetchTimestampRef: caPasseOuCaCashMaster.state === "question_fetchTimestamp",
  });

  React.useEffect(() => {
    const updateCaPasseOuCaCashMaster = ({
      state,
      quizLevel,
      questionNumber,
      playersPoints,
    }: Partial<CaPasseOuCaCashMaster>) => {
      const newCaPasseOuCaCashMaster = {
        state: state || caPasseOuCaCashMaster.state,
        quizLevel: quizLevel || caPasseOuCaCashMaster.quizLevel,
        questionNumber: questionNumber || caPasseOuCaCashMaster.questionNumber,
        playersPoints: playersPoints || caPasseOuCaCashMaster.playersPoints,
      };
      setCookie<CaPasseOuCaCashMaster>({
        prefix: shortId,
        cookieName: ECookieName.caPasseOuCaCashMaster,
        cookieValue: newCaPasseOuCaCashMaster,
      });
      setCaPasseOuCaCashMaster(newCaPasseOuCaCashMaster);
    };

    const getPlayersPoints = (): PlayersPoints => {
      const playersPoints: PlayersPoints = caPasseOuCaCashMaster.playersPoints;
      for (const playerId of Object.keys(caPasseOuCaCashMaster.playersPoints)) {
        playersPoints[playerId].previous = caPasseOuCaCashMaster.playersPoints[playerId].current;
        const additionalPoints = playersAnswers[playerId]?.isGoodAnswer
          ? ECaPasseOuCaCashPoints[quizLevel][playersAnswers[playerId].answerType] +
            (playersAnswers[playerId].isFirstGoodCash ? 1 : 0)
          : 0;

        playersPoints[playerId].current += additionalPoints;
      }

      return playersPoints;
    };

    switch (caPasseOuCaCashMaster.state) {
      case "stageName_wait":
        const stageNameWaitTimeout = setTimeout(() => {
          updateCaPasseOuCaCashMaster({
            state: "stageName",
          });
        }, 2000);
        return () => clearTimeout(stageNameWaitTimeout);
      case "stageName":
        const stageNameTimeout = setTimeout(() => {
          updateCaPasseOuCaCashMaster({
            state: "quizItemInfos",
          });
        }, 6000);
        return () => clearTimeout(stageNameTimeout);
      case "quizItemInfos":
        const quizItemInfosTimeout = setTimeout(() => {
          updateCaPasseOuCaCashMaster({
            state: "quizItemInfos_fetchQuizItemData",
          });
        }, 1500);
        return () => clearTimeout(quizItemInfosTimeout);
      case "quizItemInfos_fetchQuizItemData":
        updateCaPasseOuCaCashMaster({
          state: "quizItemInfos_checkQuizIsReady",
        });
        break;
      case "quizItemInfos_checkQuizIsReady":
        if (quizItemData && !questionsRecord[quizItemData?.quizItemSignature]?.isDone) {
          updateCaPasseOuCaCashMaster({
            state: "quizItemInfos_showThemeSubTheme",
          });
        }
        break;
      case "quizItemInfos_showThemeSubTheme":
        const showThemeSubThemeTimeout = setTimeout(() => {
          updateCaPasseOuCaCashMaster({
            state: "question_fetchTimestamp",
          });
        }, 4000);
        return () => clearTimeout(showThemeSubThemeTimeout);
      case "question_fetchTimestamp":
        updateCaPasseOuCaCashMaster({
          state: "question",
        });
        break;
      case "question":
        if (!quizBackgroundSoundisPlaying) {
          quizBackgroundSoundPlay();
        }
        if (allPlayersHaveAnswered) {
          updateCaPasseOuCaCashMaster({
            state: "questionMustTimeout",
          });
        } else if (questionsRecord[quizItemData?.quizItemSignature]?.isDone) {
          updateCaPasseOuCaCashMaster({
            state: "questionIsTimedOut",
          });
        }
        break;
      case "questionMustTimeout":
        if (quizBackgroundSoundisPlaying) {
          quizBackgroundSoundFadeOutAndStop();
        }
        const questionMustTimeoutTimeout = setTimeout(() => {
          updateCaPasseOuCaCashMaster({
            state: "questionSummary",
            playersPoints: getPlayersPoints(),
          });
        }, 2000);
        return () => clearTimeout(questionMustTimeoutTimeout);
      case "questionIsTimedOut":
        if (quizBackgroundSoundisPlaying) {
          quizBackgroundSoundFadeOutAndStop();
        }
        const questionIsTimedOutTimeout = setTimeout(() => {
          updateCaPasseOuCaCashMaster({
            state: "questionSummary",
            playersPoints: getPlayersPoints(),
          });
        }, 1000);
        return () => clearTimeout(questionIsTimedOutTimeout);
      case "questionSummary":
        const questionSummaryTimeout = setTimeout(() => {
          updateCaPasseOuCaCashMaster({
            state: "questionSummary_points",
          });
        }, 3000);
        return () => clearTimeout(questionSummaryTimeout);
      case "questionSummary_points":
        const questionSummary_pointsTimeout = setTimeout(() => {
          updateCaPasseOuCaCashMaster({
            state: "playersRanking_previous",
          });
        }, 7000);
        return () => clearTimeout(questionSummary_pointsTimeout);
      case "playersRanking_previous":
        const playersRanking_previousTimeout = setTimeout(() => {
          updateCaPasseOuCaCashMaster({
            state: "playersRanking_current",
          });
        }, 3000);
        return () => clearTimeout(playersRanking_previousTimeout);
      case "playersRanking_current":
        let playersRanking_currentTimeout: NodeJS.Timeout;
        if (caPasseOuCaCashMaster.questionNumber < 9) {
          playersRanking_currentTimeout = setTimeout(() => {
            const questionNumber = (caPasseOuCaCashMaster.questionNumber + 1) as QuestionNumber;
            updateCaPasseOuCaCashMaster({
              quizLevel: getQuizLevelByQuestionNumber({ questionNumber }),
              questionNumber,
              state: "quizItemInfos",
            });
          }, 5000);
        }
        return () => clearTimeout(playersRanking_currentTimeout);
    }
  }, [
    allPlayersHaveAnswered,
    caPasseOuCaCashMaster.playersPoints,
    caPasseOuCaCashMaster.questionNumber,
    caPasseOuCaCashMaster.quizLevel,
    caPasseOuCaCashMaster.state,
    playersAnswers,
    questionsRecord,
    quizBackgroundSoundFadeOutAndStop,
    quizBackgroundSoundPlay,
    quizBackgroundSoundisPlaying,
    quizItemData,
    quizLevel,
    shortId,
  ]);

  return { caPasseOuCaCashMaster, questionsRecord, remainingTime };
};
