import React from "react";
import { Howl } from "howler";

interface UseSoundProps {
  sound: string;
  autoplay?: boolean;
  loop?: boolean;
  fadeOut?: boolean;
  condition?: boolean;
  volume?: number;
}

interface UseSoundReturn {
  play: () => void;
  stop: () => void;
  isPlaying: boolean;
  status: "loading" | "ready";
}

export const useSound = ({
  sound,
  autoplay = false,
  loop = false,
  fadeOut = false,
  condition = true,
  volume = 1,
}: UseSoundProps): UseSoundReturn => {
  const howlSound = React.useMemo(
    () =>
      new Howl({
        src: [sound],
        loop,
        volume: fadeOut ? 0 : volume,
      }),
    [sound, loop, fadeOut, volume],
  );

  const [status, setStatus] = React.useState<"loading" | "ready">("loading");

  howlSound.once("load", () => setStatus("ready"));
  howlSound.once("play", () => {
    if (status !== "ready") setStatus("ready");
  });

  React.useEffect(() => {
    if (condition) {
      if (autoplay) {
        howlSound.play();
        howlSound.fade(0, volume, 1000);
      } else {
        howlSound.load();
      }

      return () => {
        if (fadeOut) {
          howlSound.fade(volume, 0, 1000);
        } else {
          howlSound.unload();
        }
      };
    }
  }, [howlSound, condition, fadeOut, volume, autoplay]);

  return {
    play: () => howlSound.play(),
    stop: () => howlSound.stop(),
    isPlaying: howlSound.playing(),
    status,
  };
};
