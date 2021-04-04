import React from "react";

import { CookieName } from "constants/Cookies.constants";
import {
  Answer,
  QuestionRecord,
  KidimieuxMaster,
  PlayerData,
  Buzz,
  CaPasseOuCaCashMaster,
} from "models/Game.model";
import { QuizItemData, QuizLevel } from "models/Quiz.model";
import { getCookie, setCookie } from "utils/cookies.util";
import { getQuizLevelByQuestionNumber } from "utils/quiz/getQuizLevelByQuestionNumber.util";
import { QuizDuration } from "constants/QuizDuration.constants";
import { getUpdatedPlayersPoints } from "utils/quiz/getUpdatedPlayersPoints.util";
import { KidimieuxPoints } from "constants/Kidimieux.constants";
import { useQuizLifetime } from "hooks/quiz/useQuizLifetime.hook";
import { GET_GAME, UPDATE_CURRENT_PLAYERS } from "services/games.service";
import { useMutation } from "@apollo/client";
import { usePlayersBuzz } from "hooks/quiz/usePlayersBuzz.hook";
import { QuizStage } from "constants/GameStage.constants";

interface UseKidimieuxMasterProps {
  shortId: string;
  quizItemData: QuizItemData;
  playersAnswers: Record<string, Answer>;
  quizItemSignature: string;
  quizLevel: QuizLevel;
  players: PlayerData[];
  currentPlayers: string[];
}

interface UseKidimieuxReturn {
  kidimieuxMaster: KidimieuxMaster;
  questionsRecord: Record<string, QuestionRecord>;
  playersBuzz: Record<string, Buzz>;
}

export const useKidimieuxMaster = ({
  shortId,
  quizItemData,
  playersAnswers,
  quizItemSignature,
  quizLevel,
  players,
  currentPlayers,
}: UseKidimieuxMasterProps): UseKidimieuxReturn => {
  const [kidimieuxMaster, setKidimieuxMaster] = React.useState<KidimieuxMaster>(
    getCookie<KidimieuxMaster>({
      prefix: shortId,
      cookieName: CookieName.kidimieuxMaster,
    }) || {
      state: "stageName_wait",
      quizLevel: "beginner",
      questionNumber: 1,
      playersPoints: getCookie<CaPasseOuCaCashMaster>({
        prefix: shortId,
        cookieName: CookieName.caPasseOuCaCashMaster,
      }).playersPoints,
    },
  );

  const [updateCurrentPlayers] = useMutation(UPDATE_CURRENT_PLAYERS, {
    refetchQueries: [
      {
        query: GET_GAME,
        variables: { shortId },
      },
    ],
  });

  const { questionsRecord } = useQuizLifetime({
    shortId,
    quizItemSignature,
    duration: QuizDuration.kidimieux,
    quizIsOver: Object.keys(playersAnswers).length > 0,
    shouldSetQuizBaseTimestamp:
      kidimieuxMaster.state === "question_playerMustAnswer_fetchTimestamp",
    buzzIsOver: kidimieuxMaster.state === "question_playerMustAnswer_fetchTimestamp",
    clearBuzzTimeout:
      kidimieuxMaster.state === "buzz_duo" ||
      kidimieuxMaster.state === "buzz_carre" ||
      kidimieuxMaster.state === "question_playerMustAnswer_fetchTimestamp",
    shouldSetBuzzBaseTimestamp: kidimieuxMaster.state === "buzz_fetchTimestamp",
  });

  const { playersBuzz } = usePlayersBuzz({
    shortId,
    quizItemSignature: quizItemData?.quizItemSignature,
    players,
    canBuzz:
      kidimieuxMaster.state === "buzz" ||
      kidimieuxMaster.state === "buzz_duo" ||
      kidimieuxMaster.state === "buzz_carre",
  });

  React.useEffect(() => {
    const updateKidimieuxMaster = ({
      state,
      quizLevel,
      questionNumber,
      playersPoints,
      currentAnswerType,
    }: Partial<KidimieuxMaster>) => {
      const newKidimieuxMaster = {
        state: state || kidimieuxMaster.state,
        quizLevel: quizLevel || kidimieuxMaster.quizLevel,
        questionNumber: questionNumber || kidimieuxMaster.questionNumber,
        playersPoints: playersPoints || kidimieuxMaster.playersPoints,
        currentAnswerType: currentAnswerType || kidimieuxMaster.currentAnswerType,
      };
      setCookie<KidimieuxMaster>({
        prefix: shortId,
        cookieName: CookieName.kidimieuxMaster,
        cookieValue: newKidimieuxMaster,
      });
      setKidimieuxMaster(newKidimieuxMaster);
    };

    switch (kidimieuxMaster.state) {
      case "stageName_wait":
        const stageNameWaitTimeout = setTimeout(() => {
          updateKidimieuxMaster({
            state: "stageName",
          });
        }, 2000);
        return () => clearTimeout(stageNameWaitTimeout);
      case "stageName":
        const stageNameTimeout = setTimeout(() => {
          updateKidimieuxMaster({
            state: "stageName_topScreensBackgroundSound",
          });
        }, 6000);
        return () => clearTimeout(stageNameTimeout);
      case "stageName_topScreensBackgroundSound":
        updateKidimieuxMaster({
          state: "quizItemInfos",
        });
        break;
      case "quizItemInfos":
        const quizItemInfosTimeout = setTimeout(() => {
          updateKidimieuxMaster({
            state: "quizItemInfos_fetchQuizItemData",
          });
        }, 1500);
        return () => clearTimeout(quizItemInfosTimeout);
      case "quizItemInfos_fetchQuizItemData":
        updateKidimieuxMaster({
          state: "quizItemInfos_checkQuizIsReady",
        });
        break;
      case "quizItemInfos_checkQuizIsReady":
        if (quizItemData && !questionsRecord[quizItemData?.quizItemSignature]?.isDone) {
          updateKidimieuxMaster({
            state: "quizItemInfos_showThemeSubTheme",
          });
        }
        break;
      case "quizItemInfos_showThemeSubTheme":
        const showThemeSubThemeTimeout = setTimeout(() => {
          updateKidimieuxMaster({
            state: "buzz_fetchTimestamp",
          });
        }, 4000);
        return () => clearTimeout(showThemeSubThemeTimeout);
      case "buzz_fetchTimestamp":
        updateKidimieuxMaster({
          state: "buzz_screensTransitionSound",
        });
        break;
      case "buzz_screensTransitionSound":
        updateKidimieuxMaster({
          state: "buzz",
        });
        break;
      case "buzz":
        if (Object.keys(playersBuzz).length === players.length) {
          updateKidimieuxMaster({
            state: "question_playerMustAnswer_wait",
          });
        }
        if (playersBuzz[Object.keys(playersBuzz)[0]]?.answer === "duo") {
          updateKidimieuxMaster({
            state: "buzz_duo",
          });
        } else if (playersBuzz[Object.keys(playersBuzz)[0]]?.answer === "carre") {
          updateKidimieuxMaster({
            state: "buzz_carre",
          });
        } else if (playersBuzz[Object.keys(playersBuzz)[0]]?.answer === "cash") {
          updateKidimieuxMaster({
            state: "question_playerMustAnswer_wait",
          });
        } else if (questionsRecord[quizItemData?.quizItemSignature]?.buzzIsDone) {
          updateKidimieuxMaster({
            state: "questionIsTimedOut",
          });
        }
        break;
      case "buzz_duo":
        const questionDuoBuzzTimeout = setTimeout(() => {
          updateKidimieuxMaster({
            state: "question_playerMustAnswer_wait",
          });
        }, 6000);
        if (Object.keys(playersBuzz).length === players.length) {
          updateKidimieuxMaster({
            state: "question_playerMustAnswer_wait",
          });
        }
        if (playersBuzz[Object.keys(playersBuzz)[1]]?.answer === "carre") {
          updateKidimieuxMaster({
            state: "buzz_carre",
          });
        } else if (playersBuzz[Object.keys(playersBuzz)[1]]?.answer === "cash") {
          updateKidimieuxMaster({
            state: "question_playerMustAnswer_wait",
          });
        }
        return () => clearTimeout(questionDuoBuzzTimeout);
      case "buzz_carre":
        const questionCarreBuzzTimeout = setTimeout(() => {
          updateKidimieuxMaster({
            state: "question_playerMustAnswer_wait",
          });
        }, 6000);
        if (Object.keys(playersBuzz).length === players.length) {
          updateKidimieuxMaster({
            state: "question_playerMustAnswer_wait",
          });
        }
        if (
          playersBuzz[Object.keys(playersBuzz)[1]]?.answer === "cash" ||
          playersBuzz[Object.keys(playersBuzz)[2]]?.answer === "cash"
        ) {
          updateKidimieuxMaster({
            state: "question_playerMustAnswer_wait",
          });
        }
        return () => clearTimeout(questionCarreBuzzTimeout);
      case "question_playerMustAnswer_wait":
        const playerMustAnswerWaitTimeout = setTimeout(() => {
          const currentPlayers =
            Object.keys(playersBuzz).length > 0 ? Object.keys(playersBuzz).slice(-1) : [];
          updateCurrentPlayers({ variables: { shortId, currentPlayers } });
          updateKidimieuxMaster({
            state: "question_playerMustAnswer_fetchTimestamp",
          });
        }, 3000);
        return () => clearTimeout(playerMustAnswerWaitTimeout);
      case "question_playerMustAnswer_fetchTimestamp":
        updateKidimieuxMaster({
          state: "question_playerMustAnswer",
        });
        break;
      case "question_playerMustAnswer":
        if (Object.keys(playersAnswers).length > 0) {
          updateKidimieuxMaster({
            state: "questionMustTimeout",
          });
        } else if (questionsRecord[quizItemData?.quizItemSignature]?.isDone) {
          updateKidimieuxMaster({
            state: "questionIsTimedOut",
          });
        }
        break;
      case "questionIsTimedOut":
        const questionIsTimedOutTimeout = setTimeout(() => {
          updateKidimieuxMaster({
            state: "questionSummary_topScreensBackgroundSound",
            playersPoints: getUpdatedPlayersPoints({
              stage: QuizStage.kidimieux,
              formerPlayersPoints: kidimieuxMaster.playersPoints,
              playersAnswers,
              playersBuzz,
              quizLevel,
              pointsRecord: KidimieuxPoints,
              currentPlayers,
            }),
          });
        }, 1000);
        return () => clearTimeout(questionIsTimedOutTimeout);
      case "questionMustTimeout":
        const questionMustTimeoutTimeout = setTimeout(() => {
          updateKidimieuxMaster({
            state: "questionSummary_topScreensBackgroundSound",
            playersPoints: getUpdatedPlayersPoints({
              stage: QuizStage.kidimieux,
              formerPlayersPoints: kidimieuxMaster.playersPoints,
              playersAnswers,
              playersBuzz,
              quizLevel,
              pointsRecord: KidimieuxPoints,
              currentPlayers,
            }),
          });
        }, 2000);
        return () => clearTimeout(questionMustTimeoutTimeout);
      case "questionSummary_topScreensBackgroundSound":
        updateKidimieuxMaster({
          state: "questionSummary",
        });
        break;
      case "questionSummary":
        const questionSummaryTimeout = setTimeout(() => {
          updateKidimieuxMaster({
            state: "questionSummary_points",
          });
        }, 3000);
        return () => clearTimeout(questionSummaryTimeout);
      case "questionSummary_points":
        const questionSummary_pointsTimeout = setTimeout(() => {
          updateKidimieuxMaster({
            state: "questionSummary_screenTransitionSound",
          });
        }, 7000);
        return () => clearTimeout(questionSummary_pointsTimeout);
      case "questionSummary_screenTransitionSound":
        updateKidimieuxMaster({
          state: "playersRanking_previous",
        });
        break;
      case "playersRanking_previous":
        const playersRanking_previousTimeout = setTimeout(() => {
          updateCurrentPlayers({ variables: { shortId, currentPlayers: [] } });
          updateKidimieuxMaster({
            state: "playersRanking_current",
          });
        }, 3000);
        return () => clearTimeout(playersRanking_previousTimeout);
      case "playersRanking_current":
        let playersRanking_currentTimeout: NodeJS.Timeout;
        if (kidimieuxMaster.questionNumber < 9) {
          playersRanking_currentTimeout = setTimeout(() => {
            const questionNumber = kidimieuxMaster.questionNumber + 1;
            updateKidimieuxMaster({
              quizLevel: getQuizLevelByQuestionNumber({
                stage: QuizStage.kidimieux,
                questionNumber,
              }),
              questionNumber,
              state: "playersRanking_screenTransitionSound",
            });
          }, 5000);
        }
        return () => clearTimeout(playersRanking_currentTimeout);
      case "playersRanking_screenTransitionSound":
        updateKidimieuxMaster({
          state: "quizItemInfos",
        });
        break;
    }
  }, [
    currentPlayers,
    kidimieuxMaster.currentAnswerType,
    kidimieuxMaster.playersPoints,
    kidimieuxMaster.questionNumber,
    kidimieuxMaster.quizLevel,
    kidimieuxMaster.state,
    players.length,
    playersAnswers,
    playersBuzz,
    questionsRecord,
    quizItemData,
    quizLevel,
    shortId,
    updateCurrentPlayers,
  ]);

  return { kidimieuxMaster, questionsRecord, playersBuzz };
};
