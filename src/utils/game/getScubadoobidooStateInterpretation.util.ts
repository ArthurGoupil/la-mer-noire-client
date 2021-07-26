import { ScubadoobidooState } from "models/Game.model";

interface GetScubadoobidooStateInterpretationProps {
  scubadoobidooState: ScubadoobidooState;
}

interface GetScubadoobidooStateInterpretationReturn {
  stageNameEnter: boolean;
  stageNameCanPlay: boolean;
  stageNameLeave: boolean;

  podiumPointsInfosEnter: boolean;

  raceSummaryEnter: boolean;
  raceSummaryLeave: boolean;

  showPreviousRanking: boolean;
  playersRankingEnter: boolean;
  playersRankingLeave: boolean;
}

export const getScubadoobidooStateInterpretation = ({
  scubadoobidooState,
}: GetScubadoobidooStateInterpretationProps): GetScubadoobidooStateInterpretationReturn => {
  return {
    stageNameEnter: scubadoobidooState.includes("stageName"),
    stageNameCanPlay: scubadoobidooState === "stageName",
    stageNameLeave: scubadoobidooState.includes("podiumPointsInfos"),

    podiumPointsInfosEnter:
      scubadoobidooState.includes("podiumPointsInfos") ||
      scubadoobidooState === "race_screensTransitionSound" ||
      scubadoobidooState === "race_wait",

    raceSummaryEnter: scubadoobidooState.includes("raceSummary"),
    raceSummaryLeave: scubadoobidooState.includes("playersRanking"),

    showPreviousRanking:
      scubadoobidooState === "playersRanking_previous" ||
      scubadoobidooState.includes("raceSummary"),
    playersRankingEnter: scubadoobidooState.includes("playersRanking"),
    playersRankingLeave: scubadoobidooState === "roundIsOver",
  };
};
