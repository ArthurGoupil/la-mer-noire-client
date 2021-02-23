import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { useWindowHeight } from "hooks/others/useWindowHeight.hook";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  show: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  show,
}): JSX.Element => {
  const { height } = useWindowHeight();

  return (
    <AnimatedBackgroundContainer
      className="d-flex flex-column align-center justify-center"
      height={height}
    >
      <BackgroundStripe
        height={height / 5}
        scaleX={show ? "scaleX(1)" : "scaleX(0)"}
      />
      <BackgroundStripe2
        height={height / 5}
        scaleX={show ? "scaleX(1)" : "scaleX(0)"}
      />
      <BackgroundStripe3
        height={height / 5}
        scaleX={show ? "scaleX(1)" : "scaleX(0)"}
      />
      <BackgroundStripe4
        height={height / 5}
        scaleX={show ? "scaleX(1)" : "scaleX(0)"}
      />
      <BackgroundStripe5
        height={height / 5}
        scaleX={show ? "scaleX(1)" : "scaleX(0)"}
      />
      <ChildrenContainer
        opacity={show ? 1 : 0}
        transitionDelay={show ? "1.5s" : "0"}
        className="d-flex justify-center align-center"
      >
        {children}
      </ChildrenContainer>
    </AnimatedBackgroundContainer>
  );
};

const AnimatedBackgroundContainer = styled.div<{
  height: number;
}>`
  width: 100%;
  height: ${(props) => props.height}px;
  padding: 40px;
  position: absolute;
  top: 0;
`;

const BackgroundStripe = styled.div<{
  height: number;
  scaleX: string;
}>`
  width: 100%;
  height: ${(props) => props.height}px;
  background: linear-gradient(
    to bottom,
    ${EStyles.darkBlue} 0%,
    ${EStyles.blue} 600%
  );
  position: absolute;
  top: 0;
  transform: ${(props) => props.scaleX};
  transition: transform 0.8s ease;
  opacity: 0.97;
`;

const BackgroundStripe2 = styled(BackgroundStripe)`
  top: 20%;
  background: linear-gradient(
    to bottom,
    ${EStyles.darkBlue} -100%,
    ${EStyles.blue} 500%
  );
  transition-delay: 0.2s;
`;

const BackgroundStripe3 = styled(BackgroundStripe2)`
  top: 40%;
  background: linear-gradient(
    to bottom,
    ${EStyles.darkBlue} -200%,
    ${EStyles.blue} 400%
  );
  transition-delay: 0.4s;
`;

const BackgroundStripe4 = styled(BackgroundStripe2)`
  top: 60%;
  background: linear-gradient(
    to bottom,
    ${EStyles.darkBlue} -300%,
    ${EStyles.blue} 300%
  );
  transition-delay: 0.6s;
`;

const BackgroundStripe5 = styled(BackgroundStripe2)`
  top: 80%;
  background: linear-gradient(
    to bottom,
    ${EStyles.darkBlue} -400%,
    ${EStyles.blue} 200%
  );
  transition-delay: 0.8s;
`;

const ChildrenContainer = styled.div<{
  opacity: number;
  transitionDelay: string;
}>`
  width: 80%;
  opacity: ${(props) => props.opacity};
  transition: opacity 1s;
  transition-delay: ${(props) => props.transitionDelay};
`;
