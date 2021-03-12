export const ECaPasseOuCaCashPoints = {
  beginner: { duo: 1, carre: 2, cash: 6 },
  intermediate: { duo: 2, carre: 4, cash: 8 },
  expert: { duo: 3, carre: 6, cash: 10 },
};

export enum ECaPasseOuCaCashBottomScreensStates {
  question_fetchTimestamp = "question_fetchTimestamp",
  question = "question",
  allPlayersHaveAnswered = "allPlayersHaveAnswered",
  questionIsTimedOut = "questionIsTimedOut",
  questionMustTimeout = "questionMustTimeout",
}

export enum ECaPasseOuCaCashTopScreensStates {
  stageName_wait = "stageName_wait",
  stageName = "stageName",
  quizItemInfos = "quizItemInfos",
  quizItemInfos_fetchQuizItemData = "quizItemInfos_fetchQuizItemData",
  quizItemInfos_checkQuizIsReady = "quizItemInfos_checkQuizIsReady",
  quizItemInfos_showThemeSubTheme = "quizItemInfos_showThemeSubTheme",
  questionSummary = "questionSummary",
  questionSummary_points = "questionSummary_points",
  playersRanking_previous = "playersRanking_previous",
  playersRanking_current = "playersRanking_current",
}
