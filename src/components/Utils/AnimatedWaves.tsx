import { Styles } from "constants/Styling.constants";
import React from "react";
import styled from "styled-components";

interface AnimatedWavesProps {
  backgroundGradient?: string[];
}

export const AnimatedWaves: React.FC<AnimatedWavesProps> = ({
  backgroundGradient = [Styles.redOrange, Styles.yellow],
}): JSX.Element => {
  const svgContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <SvgContainer
      ref={svgContainerRef}
      height={svgContainerRef.current?.clientHeight || 200}
      backgroundGradientTop={backgroundGradient[0]}
      backgroundGradientBottom={backgroundGradient[1]}
    >
      <SvgWave
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 
 58-18 88-18s
 58 18 88 18 
 58-18 88-18 
 58 18 88 18
 v44h-352z"
          />
        </defs>
        <Parallax>
          <use xlinkHref="#gentle-wave" x="50" y="0" fill={Styles.darkBlue} />
          <use xlinkHref="#gentle-wave" x="50" y="3" fill={Styles.blue} />
          <use xlinkHref="#gentle-wave" x="50" y="6" fill={Styles.lightBlue} />
        </Parallax>
      </SvgWave>
    </SvgContainer>
  );
};

const SvgContainer = styled.div<{
  height: number;
  backgroundGradientTop: string;
  backgroundGradientBottom: string;
}>`
  width: 100%;
  height: 15%;
  position: relative;
  box-shadow: 0 ${(props) => props.height}px ${(props) => props.height / 2}px -${(props) =>
      props.height / 2}px ${(props) => props.backgroundGradientTop} inset;
  background-color: ${(props) => props.backgroundGradientBottom};
  transition: box-shadow 1s, background-color 1s;
  border: none;
  overflow: hidden;
`;

const SvgWave = styled.svg`
  width: 100%;
  height: 80%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Parallax = styled.g`
  & use {
    animation: move-forever 12s linear infinite;

    &:nth-child(1) {
      animation-delay: -2s;
    }
    &:nth-child(2) {
      animation-delay: -2s;
      animation-duration: 5s;
    }
    &:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 3s;
    }
  }

  @keyframes move-forever {
    0% {
      transform: translate(-90px, 0%);
    }
    100% {
      transform: translate(85px, 0%);
    }
  }
`;

// const Use1 = styled.use`
//   animation-delay: -2s;
// `;
// const Use2 = styled.use`
//   animation-delay: -2s;
//   animation-duration: 5s;
// `;
// const Use3 = styled.use`
//   animation-delay: -2s;
// `;
