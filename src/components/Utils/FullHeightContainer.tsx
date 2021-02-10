import React from "react";
import styled from "styled-components";

import useWindowHeight from "hooks/useWindowHeight.hook";
interface FullHeightContainerProps {
  children: React.ReactNode;
  padding?: number;
  className?: string;
}

const FullHeightContainer: React.FC<FullHeightContainerProps> = ({
  children,
  padding = 40,
  className = "d-flex justify-center align-center",
}): JSX.Element => {
  const height = useWindowHeight();

  return (
    <Container className={className} height={height} padding={padding}>
      {children}
    </Container>
  );
};

const Container = styled.div<{ height: number; padding: number }>`
  width: 100%;
  height: 100%;
  min-height: ${(props) => props.height}px;
  overflow: hidden;
  position: relative;
  padding: ${(props) => props.padding}px;
`;

export default FullHeightContainer;
