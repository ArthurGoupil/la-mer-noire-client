export const CaPasseOuCaCashPoints = {
  beginner: { duo: 1, carre: 2, cash: 6 },
  intermediate: { duo: 2, carre: 4, cash: 8 },
  expert: { duo: 3, carre: 6, cash: 10 },
};

export enum CaPasseOuCaCashBottomScreensStates {
  question_fetchTimestamp = "question_fetchTimestamp",
  question_screensTransitionSound = "question_screensTransitionSound",
  question = "question",
  questionIsTimedOut = "questionIsTimedOut",
  questionMustTimeout = "questionMustTimeout",
}

export enum CaPasseOuCaCashTopScreensStates {
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
