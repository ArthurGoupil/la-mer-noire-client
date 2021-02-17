import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";

interface TimeBarProps {
  totalTime: number;
  remainingTime: number;
  isOver: boolean;
  isHost?: boolean;
}

export const TimeBar: React.FC<TimeBarProps> = ({
  totalTime,
  remainingTime,
  isOver,
  isHost = false,
}): JSX.Element => {
  const initialWidth = 100 - (100 * remainingTime) / totalTime + "%";
  const barContainerRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);

  return (
    <BarContainer
      ref={barContainerRef}
      className="d-flex justify-start"
      margin={isHost ? "0" : "10px"}
    >
      <Bar
        ref={barRef}
        initialWidth={initialWidth}
        remainingTime={remainingTime}
        isOver={isOver}
        currentWidth={barRef.current?.clientWidth as number}
        containerWidth={barContainerRef.current?.clientWidth as number}
      />
    </BarContainer>
  );
};

const BarContainer = styled.div<{ margin: string }>`
  width: 100%;
  margin: ${(props) => props.margin};
  padding: 10px;
  background-color: ${EStyles.darken_darkBlue};
  border-radius: ${EStyles.miniRadius};
`;

const Bar = styled.div<{
  initialWidth: string;
  remainingTime: number;
  isOver: boolean;
  currentWidth: number;
  containerWidth: number;
}>`
  width: 100%;
  height: 40px;
  background: linear-gradient(
    to bottom,
    ${EStyles.red} 20%,
    ${EStyles.darken_redOrange} 100%
  );
  border-radius: ${EStyles.miniRadius};
  animation: ${(props) =>
    !props.isOver
      ? `normalTransformX ${props.remainingTime}s linear`
      : "overTransformX 0.5s ease-out"};

  @keyframes normalTransformX {
    from {
      width: ${(props) => props.initialWidth};
    }
  }
  @keyframes overTransformX {
    from {
      width: ${(props) =>
        `${(props.currentWidth / (props.containerWidth - 20)) * 100}%`};
    }
  }
`;
