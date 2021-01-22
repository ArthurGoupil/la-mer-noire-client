import React from "react";
import styled from "styled-components";
import { mainDarkBlue } from "../../styles/StylingVariables";

const AnimatedSubmarine: React.FC<{}> = (): JSX.Element => {
  return (
    <SubmarineContainer>
      <SubmarineLightWrapper className="d-flex align-center">
        <Submarine src={"/submarine-fox.svg"} />
        <LightWrapper>
          <Light />
          <Bubble1 />
          <Bubble2 />
          <Bubble3 />
          <Bubble4 />
          <Bubble5 />
          <Bubble6 />
        </LightWrapper>
      </SubmarineLightWrapper>
    </SubmarineContainer>
  );
};

export default AnimatedSubmarine;

const SubmarineContainer = styled.div`
  position: absolute;
  width: 100vw;
  left: 0;
  pointer-events: none;
  animation: translate 15s infinite linear;

  @keyframes translate {
    to {
      transform: translatex(150%);
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
  margin-bottom: 200px;
  animation: upDown 1.5s alternate infinite ease-in-out;
`;

const Submarine = styled.img`
  z-index: 1;
  position: absolute;
  width: 180px;
  left: -600px;
`;

const LightWrapper = styled.div`
  transform: rotate(-30deg);
`;

const Light = styled.div`
  z-index: 0;
  position: absolute;
  width: 0;
  height: 0;
  top: -250px;
  left: -650px;
  opacity: 0.15;
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
  box-shadow: 2px 2px 0 ${mainDarkBlue};
`;
const Bubble1 = styled(BubbleBase)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  left: -550px;
  top: -300px;

  animation: bubbleOpacity 0.2s 0.1s alternate infinite ease-in-out;
`;
const Bubble2 = styled(BubbleBase)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  left: -570px;
  top: -300px;

  animation: bubbleOpacity 0.2s alternate infinite ease-in-out;
`;
const Bubble3 = styled(BubbleBase)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  left: -590px;
  top: -300px;

  animation: bubbleOpacity 0.2s 0.15s alternate infinite ease-in-out;
`;
const Bubble4 = styled(BubbleBase)`
  width: 18px;
  height: 18px;
  border-radius: 10px;
  left: -560px;
  top: -280px;

  animation: bubbleOpacity 0.2s 0.12s alternate infinite ease-in-out;
`;
const Bubble5 = styled(BubbleBase)`
  width: 5px;
  height: 5px;
  border-radius: 5px;
  left: -575px;
  top: -270px;

  animation: bubbleOpacity 0.2s 0.18s alternate infinite ease-in-out;
`;
const Bubble6 = styled(BubbleBase)`
  width: 8px;
  height: 8px;
  border-radius: 5px;
  left: -570px;
  top: -320px;

  animation: bubbleOpacity 0.2s 0.11s alternate infinite ease-in-out;
`;
