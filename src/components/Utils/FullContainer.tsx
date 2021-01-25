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

const Container = styled.div`
  width: 100%;
  min-height: ${window.innerHeight}px;
  overflow: hidden;
  position: relative;
  padding: 40px;
`;
