import React from "react";
import { Howl } from "howler";

interface UseSoundProps {
  sound: string;
  autoplay: boolean;
  loop: boolean;
  fadeOut: boolean;
  condition?: boolean;
  volume?: number;
}

interface UseSoundReturn {
  play: () => void;
  status: "loading" | "ready";
}

export const useSound = ({
  sound,
  autoplay,
  loop,
  fadeOut,
  condition = true,
  volume = 0.7,
}: UseSoundProps): UseSoundReturn => {
  const howlSound = React.useMemo(
    () =>
      new Howl({
        src: [sound],
        loop,
        volume: fadeOut ? 0 : 0.7,
      }),
    [sound, loop, fadeOut],
  );

  const [status, setStatus] = React.useState<"loading" | "ready">("loading");

  howlSound.once("load", () => setStatus("ready"));
  howlSound.once("play", () => {
    if (status !== "ready") setStatus("ready");
  });
  console.log(howlSound);

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
          setTimeout(() => {
            howlSound.unload();
          }, 1000);
        } else {
          howlSound.unload();
        }
      };
    }
  }, [howlSound, condition, fadeOut, volume, autoplay]);

  return { play: () => howlSound.play(), status };
};
