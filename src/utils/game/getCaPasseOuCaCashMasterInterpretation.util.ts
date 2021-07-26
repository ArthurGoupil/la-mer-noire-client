import { CaPasseOuCaCashMaster } from "models/Game.model";

interface GetCaPasseOuCaCashMasterInterpretationProps {
  caPasseOuCaCashMaster: CaPasseOuCaCashMaster;
}

interface GetCaPasseOuCaCashMasterInterpretationReturn {
  stageNameEnter: boolean;
  stageNameCanPlay: boolean;
  stageNameLeave: boolean;

  quizItemInfosEnter: boolean;
  showThemeSubTheme: boolean;

  fetchQuizItemData: boolean;

  displayTimeBar: boolean;
  timeBarShouldAnimateToEnd: boolean;
  quizOverSoundShouldStop: boolean;

  questionSummaryEnter: boolean;
  questionSummaryLeave: boolean;
  showAdditionalPoints: boolean;

  showPreviousRanking: boolean;
  playersRankingEnter: boolean;
  playersRankingLeave: boolean;
}

export const getCaPasseOuCaCashMasterInterpretation = ({
  caPasseOuCaCashMaster,
}: GetCaPasseOuCaCashMasterInterpretationProps): GetCaPasseOuCaCashMasterInterpretationReturn => {
  return {
    stageNameEnter: caPasseOuCaCashMaster.state.includes("stageName"),
    stageNameCanPlay: caPasseOuCaCashMaster.state === "stageName",
    stageNameLeave:
      caPasseOuCaCashMaster.state.includes("quizItemInfos") &&
      caPasseOuCaCashMaster.questionNumber === 1,

    quizItemInfosEnter:
      caPasseOuCaCashMaster.state.includes("quizItemInfos") ||
      caPasseOuCaCashMaster.state === "question" ||
      caPasseOuCaCashMaster.state === "question_fetchTimestamp" ||
      caPasseOuCaCashMaster.state === "question_screensTransitionSound",
    showThemeSubTheme:
      caPasseOuCaCashMaster.state === "quizItemInfos_showThemeSubTheme" ||
      caPasseOuCaCashMaster.state === "question" ||
      caPasseOuCaCashMaster.state === "question_fetchTimestamp" ||
      caPasseOuCaCashMaster.state === "question_screensTransitionSound",

    fetchQuizItemData: caPasseOuCaCashMaster.state === "quizItemInfos_fetchQuizItemData",

    displayTimeBar: caPasseOuCaCashMaster.state.includes("question"),
    timeBarShouldAnimateToEnd: caPasseOuCaCashMaster.state === "questionMustTimeout",
    quizOverSoundShouldStop: caPasseOuCaCashMaster.state === "questionMustTimeout",

    questionSummaryEnter: caPasseOuCaCashMaster.state.includes("questionSummary"),
    questionSummaryLeave: caPasseOuCaCashMaster.state.includes("playersRanking"),
    showAdditionalPoints: caPasseOuCaCashMaster.state === "questionSummary_points",

    showPreviousRanking:
      caPasseOuCaCashMaster.state === "playersRanking_previous" ||
      caPasseOuCaCashMaster.state === "questionSummary_points",
    playersRankingEnter: caPasseOuCaCashMaster.state.includes("playersRanking"),
    playersRankingLeave:
      (caPasseOuCaCashMaster.state.includes("quizItemInfos") &&
        caPasseOuCaCashMaster.questionNumber !== 1) ||
      caPasseOuCaCashMaster.state === "roundIsOver",
  };
};
