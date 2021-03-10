import { CaPasseOuCaCashState } from "models/Game.model";

interface GetCaPasseOuCaCashStateInterpretationProps {
  caPasseOuCaCashState: CaPasseOuCaCashState;
}

interface GetCaPasseOuCaCashStateInterpretationReturn {
  fetchQuizItemData: boolean;
  showAdditionalPoints: boolean;
  questionSummaryEnter: boolean;
  questionSummaryLeave: boolean;
  showPreviousRanking: boolean;
  playersRankingEnter: boolean;
  playersRankingLeave: boolean;
  showThemeSubTheme: boolean;
  quizItemInfosEnter: boolean;
  stageNameEnter: boolean;
  stageNameCanPlay: boolean;
  stageNameLeave: boolean;
}

export const getCaPasseOuCaCashStateInterpretation = ({
  caPasseOuCaCashState,
}: GetCaPasseOuCaCashStateInterpretationProps): GetCaPasseOuCaCashStateInterpretationReturn => {
  return {
    fetchQuizItemData: caPasseOuCaCashState.stateName === "quizItemInfos_fetchQuizItemData",
    showAdditionalPoints: caPasseOuCaCashState.stateName === "questionSummary_points",
    questionSummaryEnter: caPasseOuCaCashState.stateName.includes("questionSummary"),
    questionSummaryLeave: caPasseOuCaCashState.stateName.includes("playersRanking"),
    showPreviousRanking:
      caPasseOuCaCashState.stateName === "playersRanking_previous" ||
      caPasseOuCaCashState.stateName === "questionSummary_points",
    playersRankingEnter: caPasseOuCaCashState.stateName.includes("playersRanking"),
    playersRankingLeave:
      caPasseOuCaCashState.stateName.includes("quizItemInfos") &&
      caPasseOuCaCashState.questionNumber !== 1,
    showThemeSubTheme:
      caPasseOuCaCashState.stateName === "quizItemInfos_showThemeSubTheme" ||
      caPasseOuCaCashState.stateName === "question",
    quizItemInfosEnter:
      caPasseOuCaCashState.stateName.includes("quizItemInfos") ||
      caPasseOuCaCashState.stateName === "question",
    stageNameEnter: caPasseOuCaCashState.stateName.includes("stageName"),
    stageNameCanPlay: caPasseOuCaCashState.stateName === "stageName",
    stageNameLeave:
      caPasseOuCaCashState.stateName.includes("quizItemInfos") &&
      caPasseOuCaCashState.questionNumber === 1,
  };
};
