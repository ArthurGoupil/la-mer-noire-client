import React from "react";
import styled from "styled-components";

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
  return (
    <Container className={className} padding={padding}>
      {children}
    </Container>
  );
};

export default FullHeightContainer;

const Container = styled.div<{ padding: number }>`
  width: 100%;
  height: 100%;
  min-height: ${window.innerHeight}px;
  overflow: hidden;
  position: relative;
  padding: ${(props) => props.padding}px;
`;
