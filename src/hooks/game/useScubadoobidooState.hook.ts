import React from "react";
import { useMutation } from "@apollo/client";

import { CookieName } from "constants/Cookies.constants";
import { ScubadoobidooState } from "models/Game.model";
import { getCookie, setCookie } from "utils/cookies.util";
import { GET_GAME, UPDATE_PLAYERS_CAN_ANSWER } from "services/games.service";

interface UseScubadoobidooStateProps {
  shortId: string;
  raceIsOver: boolean;
}

interface UseScubadoobidooStateReturn {
  scubadoobidooState: ScubadoobidooState;
}

export const useScubadoobidooState = ({
  shortId,
  raceIsOver,
}: UseScubadoobidooStateProps): UseScubadoobidooStateReturn => {
  const [updatePlayersCanAnswer] = useMutation(UPDATE_PLAYERS_CAN_ANSWER, {
    refetchQueries: [
      {
        query: GET_GAME,
        variables: { shortId },
      },
    ],
  });

  const [scubadoobidooState, setScubadoobidooState] = React.useState<ScubadoobidooState>(
    getCookie({
      prefix: shortId,
      cookieName: CookieName.scubadoobidooState,
    }) || "stageName_wait",
  );

  React.useEffect(() => {
    const updateScubadoobidooState = (state: ScubadoobidooState) => {
      setCookie<ScubadoobidooState>({
        prefix: shortId,
        cookieName: CookieName.scubadoobidooState,
        cookieValue: state,
      });
      setScubadoobidooState(state);
    };

    switch (scubadoobidooState) {
      case "stageName_wait":
        const stageNameWaitTimeout = setTimeout(() => {
          updateScubadoobidooState("stageName");
        }, 2000);
        return () => clearTimeout(stageNameWaitTimeout);
      case "stageName":
        const stageNameTimeout = setTimeout(() => {
          updateScubadoobidooState("stageName_topScreensBackgroundSound");
        }, 6000);
        return () => clearTimeout(stageNameTimeout);
      case "stageName_topScreensBackgroundSound":
        updateScubadoobidooState("podiumPointsInfos_empty");
        break;
      case "podiumPointsInfos_empty":
        const podiumPointsInfos_emptyTimeout = setTimeout(() => {
          updateScubadoobidooState("podiumPointsInfos_third");
        }, 2000);
        return () => clearTimeout(podiumPointsInfos_emptyTimeout);
      case "podiumPointsInfos_third":
        const podiumPointsInfos_thirdTimeout = setTimeout(() => {
          updateScubadoobidooState("podiumPointsInfos_second");
        }, 3000);
        return () => clearTimeout(podiumPointsInfos_thirdTimeout);
      case "podiumPointsInfos_second":
        const podiumPointsInfos_secondTimeout = setTimeout(() => {
          updateScubadoobidooState("podiumPointsInfos_first");
        }, 3000);
        return () => clearTimeout(podiumPointsInfos_secondTimeout);
      case "podiumPointsInfos_first":
        const podiumPointsInfos_firstTimeout = setTimeout(() => {
          updateScubadoobidooState("race_screensTransitionSound");
        }, 3000);
        return () => clearTimeout(podiumPointsInfos_firstTimeout);
      case "race_screensTransitionSound":
        updateScubadoobidooState("race_wait");
        break;
      case "race_wait":
        const race_waitTimeout = setTimeout(() => {
          updateScubadoobidooState("race_counter");
        }, 3000);
        return () => clearTimeout(race_waitTimeout);
      case "race_counter":
        const race_counterTimeout = setTimeout(() => {
          updateScubadoobidooState("race");
          updatePlayersCanAnswer({
            variables: { shortId, playersCanAnswer: true },
          });
        }, 4500);
        return () => clearTimeout(race_counterTimeout);
      case "race":
        if (raceIsOver) {
          updateScubadoobidooState("raceIsOver");
        }
        break;
      case "raceIsOver":
        const raceIsOver_waitTimeout = setTimeout(() => {
          updateScubadoobidooState("raceIsOver_screensTransitionSound");
        }, 2000);
        return () => clearTimeout(raceIsOver_waitTimeout);
      case "raceIsOver_screensTransitionSound":
        updateScubadoobidooState("raceSummary_empty");
        break;
      case "raceSummary_empty":
        const raceSummary_emptyTimeout = setTimeout(() => {
          updateScubadoobidooState("raceSummary_third");
        }, 2000);
        return () => clearTimeout(raceSummary_emptyTimeout);
      case "raceSummary_third":
        const raceSummary_thirdTimeout = setTimeout(() => {
          updateScubadoobidooState("raceSummary_second");
        }, 2000);
        return () => clearTimeout(raceSummary_thirdTimeout);
      case "raceSummary_second":
        const raceSummary_secondTimeout = setTimeout(() => {
          updateScubadoobidooState("raceSummary_first");
        }, 2000);
        return () => clearTimeout(raceSummary_secondTimeout);
      case "raceSummary_first":
        const raceSummary_firstTimeout = setTimeout(() => {
          updateScubadoobidooState("raceSummary_topScreensTransitionSound");
        }, 2000);
        return () => clearTimeout(raceSummary_firstTimeout);
      case "raceSummary_topScreensTransitionSound":
        updateScubadoobidooState("playersRanking_previous");
        break;
      case "playersRanking_previous":
        const playersRanking_previousTimeout = setTimeout(() => {
          updateScubadoobidooState("playersRanking_current");
        }, 3000);
        return () => clearTimeout(playersRanking_previousTimeout);
      case "playersRanking_current":
        const playersRanking_currentTimeout = setTimeout(() => {
          updateScubadoobidooState("roundIsOver");
        }, 6000);
        return () => clearTimeout(playersRanking_currentTimeout);
      case "roundIsOver":
        const roundIsOverTimeout = setTimeout(() => ({}), 2000);
        return () => clearTimeout(roundIsOverTimeout);
    }
  }, [raceIsOver, scubadoobidooState, shortId, updatePlayersCanAnswer]);

  return { scubadoobidooState };
};
