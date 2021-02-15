import React from "react";
import styled from "styled-components";

import { useWindowHeight } from "hooks/others/useWindowHeight.hook";
interface FullHeightContainerProps {
  children: React.ReactNode;
  padding?: string;
  minHeight?: string | null;
  className?: string;
}

export const FullHeightContainer: React.FC<FullHeightContainerProps> = ({
  children,
  padding = "40px",
  minHeight = null,
  className = "d-flex justify-center align-center",
}): JSX.Element => {
  const { height } = useWindowHeight();

  return (
    <Container
      className={className}
      height={height}
      minHeight={minHeight}
      padding={padding}
    >
      {children}
    </Container>
  );
};

const Container = styled.div<{
  height: number;
  minHeight: string | null;
  padding: string;
}>`
  width: 100%;
  height: 100%;
  min-height: ${(props) => props.minHeight || props.height}px;
  overflow: hidden;
  position: relative;
  padding: ${(props) => props.padding};
`;
