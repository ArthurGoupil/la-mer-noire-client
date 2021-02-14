import React from "react";
import styled from "styled-components";

import useWindowHeight from "hooks/others/useWindowHeight.hook";

const ToggleFullScreen: React.FC = (): JSX.Element => {
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const { height } = useWindowHeight();

  const handleClick = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  React.useEffect(() => {
    if (height !== window.outerHeight) {
      setIsFullScreen(false);
    } else {
      setIsFullScreen(true);
    }
  }, [height]);

  return (
    <FullScreenIcon
      src={
        !isFullScreen ? "/icons/fullscreen.svg" : "/icons/exit-fullscreen.svg"
      }
      onClick={handleClick}
    />
  );
};

const FullScreenIcon = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
  z-index: 1;
`;

export default ToggleFullScreen;
