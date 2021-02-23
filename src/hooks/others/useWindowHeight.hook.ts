import React from "react";
import { isDesktop } from "utils/isDesktop.util";

interface UseWindowHeightReturn {
  height: number;
}

export const useWindowHeight = (): UseWindowHeightReturn => {
  const [height, setHeight] = React.useState<number>(window.innerHeight);

  const handleChangeHeight = () => {
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    if (isDesktop()) {
      window.addEventListener("resize", handleChangeHeight);

      return () => {
        window.removeEventListener("resize", handleChangeHeight);
      };
    }
  }, []);

  return { height };
};
