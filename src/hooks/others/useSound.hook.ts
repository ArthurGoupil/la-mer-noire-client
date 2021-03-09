import React from "react";
import { Howl } from "howler";

interface UseSoundProps {
  sound: string;
  condition: boolean;
  loop: boolean;
  fadeOut: boolean;
  volume?: number;
}

export const useSound = ({
  sound,
  condition,
  loop,
  fadeOut,
  volume = 0.7,
}: UseSoundProps): void => {
  const mainSound = React.useMemo(
    () =>
      new Howl({
        src: [sound],
        loop,
        volume: 0,
      }),
    [sound, loop],
  );

  React.useEffect(() => {
    if (condition) {
      mainSound.play();
      mainSound.fade(0, volume, 1000);

      return () => {
        if (fadeOut) {
          mainSound.fade(volume, 0, 1000);
          setTimeout(() => {
            mainSound.unload();
          }, 1000);
        } else {
          mainSound.unload();
        }
      };
    }
  }, [mainSound, condition, fadeOut, volume]);
};
