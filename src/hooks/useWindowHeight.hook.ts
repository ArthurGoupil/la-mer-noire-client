import React from "react";
import isDesktop from "utils/isDesktop.util";

const useWindowHeight = (): number => {
  const [height, setHeight] = React.useState<number>(window.innerHeight);

  const handleChangeHeight = () => setHeight(window.innerHeight);

  React.useEffect(() => {
    if (isDesktop()) {
      window.addEventListener("resize", handleChangeHeight);

      return () => {
        window.removeEventListener("resize", handleChangeHeight);
      };
    }
  }, []);

  return height;
};

export default useWindowHeight;
