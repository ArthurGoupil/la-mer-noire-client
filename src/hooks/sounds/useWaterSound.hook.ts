import React from "react";
import { Howl } from "howler";

export const useWaterSound = (): void => {
  const mainSound = React.useMemo(
    () =>
      new Howl({
        src: ["/sounds/Home-water.mp3"],
        loop: true,
      }),
    [],
  );

  React.useEffect(() => {
    mainSound.play();
    return () => {
      mainSound.fade(1, 0, 200);
    };
  }, [mainSound]);
};
