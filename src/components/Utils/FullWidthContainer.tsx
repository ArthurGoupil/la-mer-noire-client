import React from "react";
import styled from "styled-components";

interface FullWidthContainerProps {
  children: React.ReactNode;
  className?: string;
  margin?: string;
}

const FullWidthContainer: React.FC<FullWidthContainerProps> = ({
  children,
  className = "d-flex flex-column align-center",
  margin = "0",
}): JSX.Element => {
  return (
    <Container className={className} margin={margin}>
      {children}
    </Container>
  );
};

export default FullWidthContainer;

const Container = styled.div<{ margin: string }>`
  width: 100%;
  margin: ${(props) => props.margin};
`;
