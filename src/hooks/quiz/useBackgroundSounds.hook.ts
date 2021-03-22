import React from "react";

import {
  CaPasseOuCaCashBottomScreensStates,
  CaPasseOuCaCashTopScreensStates,
} from "constants/CaPasseOuCaCash.constants";
import { useSound } from "hooks/others/useSound.hook";
import { HostSounds } from "constants/Sounds.constants";

interface UseBackgroundSoundsProps {
  caPasseOuCaCashMasterState:
    | keyof typeof CaPasseOuCaCashBottomScreensStates
    | keyof typeof CaPasseOuCaCashTopScreensStates;
}

export const useBackgroundSounds = ({
  caPasseOuCaCashMasterState,
}: UseBackgroundSoundsProps): void => {
  const {
    play: quizBackgroundSoundPlay,
    fadeOutAndStop: quizBackgroundSoundFadeOutAndStop,
    isPlaying: quizBackgroundSoundIsPlaying,
  } = useSound({ sound: HostSounds.quizBackground });

  const {
    playAndFadeIn: topScreensBackgroundPlay,
    fadeOutAndStop: topScreensBackgroundFadeOutAndStop,
    isPlaying: topScreensBackgroundIsPlaying,
  } = useSound({ sound: HostSounds.topScreensBackground });

  const {
    playAndFadeIn: topScreensBackgroundStartPlay,
    fadeOutAndStop: topScreensBackgroundStartFadeOutAndStop,
    isPlaying: topScreensBackgroundStartIsPlaying,
  } = useSound({ sound: HostSounds.topScreensBackgroundStart });

  const { play: playScreensTransition, isPlaying: screensTransitionIsPlaying } = useSound({
    sound: HostSounds.screensTransition,
  });

  const { play: playTopScreenTransition, isPlaying: topScreenTransitionIsPlaying } = useSound({
    sound: HostSounds.topScreenTransition,
  });

  React.useEffect(() => {
    switch (caPasseOuCaCashMasterState) {
      case "stageName_topScreensBackgroundSound":
        if (!topScreensBackgroundStartIsPlaying) {
          topScreensBackgroundStartPlay();
        }
        if (!topScreenTransitionIsPlaying) {
          playTopScreenTransition();
        }
        break;
      case "question_screensTransitionSound":
        if (!screensTransitionIsPlaying) {
          playScreensTransition();
        }
        break;
      case "question":
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
    caPasseOuCaCashMasterState,
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
