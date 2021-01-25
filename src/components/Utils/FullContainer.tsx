import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";

interface FullContainerProps {
  children: React.ReactNode;
  className: string;
}

const FullContainer: React.FC<FullContainerProps> = ({
  children,
  className,
}): JSX.Element => {
  return <Container className={className}>{children}</Container>;
};

export default FullContainer;

console.log(window.innerHeight);

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 40px;

  @media only screen and (max-width: ${EStyles.mobileBreakPoint}) {
    min-height: ${window.innerHeight}px;
  }
`;
