import React from "react";

const useWindowHeight = (): number => {
  const [height, setHeight] = React.useState<number>(window.innerHeight);

  const handleChangeHeight = () => setHeight(window.innerHeight);

  React.useEffect(() => {
    window.addEventListener("resize", handleChangeHeight);

    return () => {
      window.removeEventListener("resize", handleChangeHeight);
    };
  }, []);

  return height;
};

export default useWindowHeight;
