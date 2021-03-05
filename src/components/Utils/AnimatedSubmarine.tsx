import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { useWindowHeight } from "hooks/others/useWindowHeight.hook";

export const AnimatedSubmarine: React.FC = (): JSX.Element => {
  const { height } = useWindowHeight();

  return (
    <SubmarineContainer height={height} className="d-flex align-center">
      <SubmarineLightWrapper className="d-flex align-center">
        <Submarine>
          <Bubble1 />
          <Bubble2 />
          <Bubble3 />
          <Bubble4 />
          <Bubble5 />
          <Bubble6 />
          <LightWrapper>
            <Light />
          </LightWrapper>
        </Submarine>
      </SubmarineLightWrapper>
    </SubmarineContainer>
  );
};

const SubmarineContainer = styled.div<{ height: number }>`
  position: absolute;
  width: 100%;
  height: ${(props) => props.height}px;
  left: 0;
  pointer-events: none;

  animation: translate 15s infinite linear;
  @media only screen and (max-width: ${EStyles.tabletBreakPoint}) {
    animation: translateTablet 15s infinite linear;
  }
  @media only screen and (max-width: ${EStyles.mobileBreakPoint}) {
    animation: translateMobile 10s infinite linear;
  }

  @keyframes translate {
    to {
      transform: translatex(120vw);
    }
  }
  @keyframes translateTablet {
    to {
      transform: translatex(150vw);
    }
  }
  @keyframes translateMobile {
    to {
      transform: translatex(200vw);
    }
  }
  @keyframes upDown {
    to {
      transform: translatey(100px);
    }
  }
  @keyframes rotate {
    to {
      transform: rotate(-40deg);
    }
  }
  @keyframes opacity {
    from {
      opacity: 0;
    }
  }
  @keyframes bubbleOpacity {
    from {
      width: 0;
      height: 0;
    }
  }
`;

const SubmarineLightWrapper = styled.div`
  height: 100%;
  margin-bottom: 200px;
`;

const Submarine = styled.div`
  position: absolute;
  width: 180px;
  height: 150px;
  background-image: url("/submarine-fox.svg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  animation: upDown 1.5s alternate infinite ease-in-out;

  left: -20vw;
  @media only screen and (max-width: ${EStyles.tabletBreakPoint}) {
    left: -40vw;
  }
  @media only screen and (max-width: ${EStyles.mobileBreakPoint}) {
    left: -80vw;
  }
`;

const LightWrapper = styled.div`
  position: relative;
  transform: rotate(-30deg);
  top: 110px;
  right: 120px;
`;

const Light = styled.div`
  z-index: 0;
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0.2;
  transform: rotate(-10deg);
  transform-origin: top;
  border-bottom: 2000px solid white;
  border-left: 200px solid transparent;
  border-right: 200px solid transparent;
  filter: blur(20px);
  animation: rotate 3s alternate infinite ease-in-out, opacity 15s infinite;
`;

const BubbleBase = styled.div`
  position: absolute;
  background-color: #99d3f5;
  opacity: 1;
  box-shadow: 2px 2px 0 ${EStyles.darkBlue};
`;
const Bubble1 = styled(BubbleBase)`
  width: 10px;
  height: 10px;
  border-radius: 5px;

  top: 125px;
  right: 185px;
  animation: bubbleOpacity 0.2s 0.1s alternate infinite ease-in-out;
`;
const Bubble2 = styled(BubbleBase)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  top: 100px;
  right: 190px;

  animation: bubbleOpacity 0.2s alternate infinite ease-in-out;
`;
const Bubble3 = styled(BubbleBase)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  top: 110px;
  right: 210px;

  animation: bubbleOpacity 0.2s 0.15s alternate infinite ease-in-out;
`;
const Bubble4 = styled(BubbleBase)`
  width: 18px;
  height: 18px;
  border-radius: 10px;
  top: 125px;
  right: 200px;

  animation: bubbleOpacity 0.2s 0.12s alternate infinite ease-in-out;
`;
const Bubble5 = styled(BubbleBase)`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  top: 120px;
  right: 225px;

  animation: bubbleOpacity 0.2s 0.18s alternate infinite ease-in-out;
`;
const Bubble6 = styled(BubbleBase)`
  width: 8px;
  height: 8px;
  border-radius: 5px;
  top: 120px;
  right: 236px;

  animation: bubbleOpacity 0.2s 0.11s alternate infinite ease-in-out;
`;
