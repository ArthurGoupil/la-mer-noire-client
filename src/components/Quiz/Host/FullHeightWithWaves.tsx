import { AnimatedWaves } from "components/Utils/AnimatedWaves";
import { Styles } from "constants/Styling.constants";
import React from "react";
import styled from "styled-components";

interface FullHeightWithWavesProps {
  children: React.ReactNode;
  wavesBackgroundGradient?: string[] | undefined;
  containerDisplay?: string;
  top?: string;
  opacity?: number;
}

export const FullHeightWithWaves: React.FC<FullHeightWithWavesProps> = ({
  children,
  wavesBackgroundGradient,
  containerDisplay = "block",
  top = "0",
  opacity = 1,
}): JSX.Element => {
  return (
    <FullHeightAndWavesContainer display={containerDisplay} top={top} opacity={opacity}>
      <AnimatedWaves backgroundGradient={wavesBackgroundGradient} />
      <ChildrenContainer className="d-flex flex-column align-center justify-center">
        {children}
      </ChildrenContainer>
    </FullHeightAndWavesContainer>
  );
};

const FullHeightAndWavesContainer = styled.div<{ display: string; top: string; opacity: number }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: ${(props) => props.top};
  display: ${(props) => props.display};
  opacity: ${(props) => props.opacity};
  transition: opacity 1s;
  background: linear-gradient(to bottom, ${Styles.lightBlue} 15%, ${Styles.blue} 100%);
  pointer-events: ${(props) => (props.opacity === 0 ? "none" : "auto")};
`;

const ChildrenContainer = styled.div`
  width: 100%;
  height: 85%;
  padding: 40px;
`;
