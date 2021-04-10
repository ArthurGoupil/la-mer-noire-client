export const KidimieuxPoints = {
  beginner: { duo: 1, carre: 2, cash: 6 },
  intermediate: { duo: 2, carre: 4, cash: 8 },
  expert: { duo: 3, carre: 6, cash: 10 },
};

export enum KidimieuxBottomScreensStates {
  buzz_fetchTimestamp = "buzz_fetchTimestamp",
  buzz_screensTransitionSound = "buzz_screensTransitionSound",
  buzz = "buzz",
  buzz_duo = "buzz_duo",
  buzz_carre = "buzz_carre",
  question_playerMustAnswer_wait = "question_playerMustAnswer_wait",
  question_playerMustAnswer_fetchTimestamp = "question_playerMustAnswer_fetchTimestamp",
  question_playerMustAnswer = "question_playerMustAnswer",
  questionIsTimedOut = "questionIsTimedOut",
  questionMustTimeout = "questionMustTimeout",
}

export enum KidimieuxTopScreensStates {
  stageName_wait = "stageName_wait",
  stageName = "stageName",
  stageName_topScreensBackgroundSound = "stageName_topScreensBackgroundSound",
  quizItemInfos = "quizItemInfos",
  quizItemInfos_fetchQuizItemData = "quizItemInfos_fetchQuizItemData",
  quizItemInfos_checkQuizIsReady = "quizItemInfos_checkQuizIsReady",
  quizItemInfos_showThemeSubTheme = "quizItemInfos_showThemeSubTheme",
  questionSummary_topScreensBackgroundSound = "questionSummary_topScreensBackgroundSound",
  questionSummary = "questionSummary",
  questionSummary_points = "questionSummary_points",
  questionSummary_screenTransitionSound = "questionSummary_screenTransitionSound",
  playersRanking_previous = "playersRanking_previous",
  playersRanking_current = "playersRanking_current",
  playersRanking_screenTransitionSound = "playersRanking_screenTransitionSound",
}
