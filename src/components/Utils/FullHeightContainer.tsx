import { useWindowHeight } from "hooks/others/useWindowHeight.hook";
import React from "react";
import styled from "styled-components";

interface FullHeightContainerProps {
  children: React.ReactNode;
  padding?: string;
  height?: string;
  className?: string;
}

export const FullHeightContainer: React.FC<FullHeightContainerProps> = ({
  children,
  padding = "40px",
  height = "100%",
  className = "d-flex justify-center align-center",
}): JSX.Element => {
  const { height: minHeight } = useWindowHeight();

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
  height: string;
  minHeight: number;
  padding: string;
}>`
  width: 100%;
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight}px;
  overflow: hidden;
  position: relative;
  padding: ${(props) => props.padding};
`;
