import React from "react";
import { Howl } from "howler";

interface UseSoundProps {
  sound: string;
  autoplay?: boolean;
  loop?: boolean;
  condition?: boolean;
  volume?: number;
  isStoppingAtUnmount?: boolean;
}

interface UseSoundReturn {
  play: () => void;
  stop: () => void;
  playAndFadeIn: () => void;
  fadeOutAndStop: () => void;
  isPlaying: boolean;
  status: "loading" | "ready";
}

export const useSound = ({
  sound,
  autoplay = false,
  loop = false,
  condition = true,
  volume = 1,
  isStoppingAtUnmount = true,
}: UseSoundProps): UseSoundReturn => {
  const howlSound = React.useMemo(
    () =>
      new Howl({
        src: [sound],
        loop,
        volume,
      }),
    [sound, loop, volume],
  );

  const [status, setStatus] = React.useState<"loading" | "ready">("loading");

  howlSound.once("load", () => setStatus("ready"));
  howlSound.once("play", () => {
    if (status !== "ready") setStatus("ready");
  });

  const playAndFadeIn = (): void => {
    howlSound.volume(0);
    howlSound.play();
    howlSound.fade(0, volume, 1000);
  };

  const fadeOutAndStop = (): void => {
    howlSound.fade(volume, 0, 1000);
    setTimeout(() => {
      howlSound.stop();
      howlSound.volume(volume);
    }, 1000);
  };

  React.useEffect(() => {
    if (condition) {
      if (autoplay) {
        howlSound.play();
        howlSound.fade(0, volume, 1000);
      } else {
        howlSound.load();
      }
    }
    return () => {
      if (isStoppingAtUnmount) {
        howlSound.stop();
      }
    };
  }, [autoplay, condition, howlSound, isStoppingAtUnmount, volume]);

  return {
    play: () => howlSound.play(),
    stop: () => howlSound.stop(),
    playAndFadeIn,
    fadeOutAndStop,
    isPlaying: howlSound.playing(),
    status,
  };
};
