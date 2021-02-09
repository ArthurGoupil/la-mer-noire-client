import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";

interface TimeBarProps {
  totalTime: number;
  remainingTime: number;
}

const TimeBar: React.FC<TimeBarProps> = ({
  totalTime,
  remainingTime,
}): JSX.Element => {
  const initialWidth = 100 - (100 * remainingTime) / totalTime + "%";

  return (
    <BarContainer className="d-flex justify-start">
      <Bar initialWidth={initialWidth} remainingTime={remainingTime} />
    </BarContainer>
  );
};

const BarContainer = styled.div`
  width: calc(100% - 20px);
  margin: 10px;
  padding: 10px;
  background-color: ${EStyles.darken_darkBlue};
  border-radius: ${EStyles.miniRadius};
`;

const Bar = styled.div<{ initialWidth: string; remainingTime: number }>`
  width: 100%;
  height: 40px;
  background: linear-gradient(
    to bottom,
    ${EStyles.red} 20%,
    ${EStyles.darken_redOrange} 100%
  );
  border-radius: ${EStyles.miniRadius};
  animation: transformX ${(props) => props.remainingTime}s linear;

  @keyframes transformX {
    from {
      width: ${(props) => props.initialWidth};
    }
  }
`;

export default TimeBar;
