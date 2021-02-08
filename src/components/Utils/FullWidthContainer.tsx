import React from "react";
import styled from "styled-components";

interface FullWidthContainerProps {
  children: React.ReactNode;
  className?: string;
}

const FullWidthContainer: React.FC<FullWidthContainerProps> = ({
  children,
  className = "d-flex flex-column align-center",
}): JSX.Element => {
  return <Container className={className}>{children}</Container>;
};

export default FullWidthContainer;

const Container = styled.div`
  width: 100%;
`;
