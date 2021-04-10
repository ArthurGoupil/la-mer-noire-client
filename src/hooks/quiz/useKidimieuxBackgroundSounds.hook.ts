import React from "react";

import { useSound } from "hooks/others/useSound.hook";
import { HostSounds } from "constants/Sounds.constants";
import {
  KidimieuxBottomScreensStates,
  KidimieuxTopScreensStates,
} from "constants/Kidimieux.constants";

interface UseKidimieuxBackgroundSoundsProps {
  kidimieuxMasterState:
    | keyof typeof KidimieuxBottomScreensStates
    | keyof typeof KidimieuxTopScreensStates;
}

export const useKidimieuxBackgroundSounds = ({
  kidimieuxMasterState,
}: UseKidimieuxBackgroundSoundsProps): void => {
  const {
    play: quizBackgroundSoundPlay,
    fadeOutAndStop: quizBackgroundSoundFadeOutAndStop,
    isPlaying: quizBackgroundSoundIsPlaying,
  } = useSound({ sound: HostSounds.quizBackgroundKidimieux });

  const {
    playAndFadeIn: topScreensBackgroundPlay,
    fadeOutAndStop: topScreensBackgroundFadeOutAndStop,
    isPlaying: topScreensBackgroundIsPlaying,
  } = useSound({ sound: HostSounds.topScreensBackgroundKidimieux });

  const {
    playAndFadeIn: topScreensBackgroundStartPlay,
    fadeOutAndStop: topScreensBackgroundStartFadeOutAndStop,
    isPlaying: topScreensBackgroundStartIsPlaying,
  } = useSound({ sound: HostSounds.topScreensBackgroundStartCPOCC });

  const { play: playScreensTransition, isPlaying: screensTransitionIsPlaying } = useSound({
    sound: HostSounds.screensTransition,
  });

  const { play: playTopScreenTransition, isPlaying: topScreenTransitionIsPlaying } = useSound({
    sound: HostSounds.topScreenTransition,
  });

  React.useEffect(() => {
    switch (kidimieuxMasterState) {
      case "stageName_topScreensBackgroundSound":
        if (!topScreensBackgroundStartIsPlaying) {
          topScreensBackgroundStartPlay();
        }
        if (!topScreenTransitionIsPlaying) {
          playTopScreenTransition();
        }
        break;
      case "buzz_screensTransitionSound":
        if (!screensTransitionIsPlaying) {
          playScreensTransition();
        }
        break;
      case "buzz":
        if (topScreensBackgroundIsPlaying) {
          topScreensBackgroundFadeOutAndStop();
        }
        if (topScreensBackgroundStartIsPlaying) {
          topScreensBackgroundStartFadeOutAndStop();
        }
        if (!quizBackgroundSoundIsPlaying) {
          quizBackgroundSoundPlay();
        }
        break;
      case "questionMustTimeout":
        if (quizBackgroundSoundIsPlaying) {
          quizBackgroundSoundFadeOutAndStop();
        }
        break;
      case "questionIsTimedOut":
        if (quizBackgroundSoundIsPlaying) {
          quizBackgroundSoundFadeOutAndStop();
        }
        break;
      case "questionSummary_topScreensBackgroundSound":
        if (!screensTransitionIsPlaying) {
          playScreensTransition();
        }
        break;
      case "questionSummary":
        if (!topScreensBackgroundIsPlaying) {
          topScreensBackgroundPlay();
        }
        break;
      case "questionSummary_screenTransitionSound":
        if (!topScreenTransitionIsPlaying) {
          playTopScreenTransition();
        }
        break;
      case "playersRanking_screenTransitionSound":
        if (!topScreenTransitionIsPlaying) {
          playTopScreenTransition();
        }
        break;
    }
  }, [
    kidimieuxMasterState,
    playScreensTransition,
    quizBackgroundSoundFadeOutAndStop,
    quizBackgroundSoundPlay,
    quizBackgroundSoundIsPlaying,
    topScreensBackgroundFadeOutAndStop,
    topScreensBackgroundIsPlaying,
    topScreensBackgroundPlay,
    screensTransitionIsPlaying,
    topScreensBackgroundStartIsPlaying,
    topScreensBackgroundStartPlay,
    topScreensBackgroundStartFadeOutAndStop,
    topScreenTransitionIsPlaying,
    playTopScreenTransition,
  ]);
};
