import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";
import { useWindowHeight } from "hooks/others/useWindowHeight.hook";
import { isDesktop } from "utils/isDesktop.util";

interface FullHeightLayoutProps {
  children: React.ReactNode;
  padding?: string;
  height?: string;
  className?: string;
}

export const FullHeightLayout: React.FC<FullHeightLayoutProps> = ({
  children,
  padding = isDesktop() ? "40px" : "20px",
  height = "100%",
  className = "d-flex justify-center align-center",
}): JSX.Element => {
  const { height: minHeight } = useWindowHeight();

  return (
    <Container className={className} height={height} minHeight={minHeight} padding={padding}>
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
  background: linear-gradient(to bottom, ${Styles.blue}, ${Styles.darkBlue});
`;
