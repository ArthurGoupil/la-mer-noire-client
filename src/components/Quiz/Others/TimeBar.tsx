import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";

interface TimeBarProps {
  totalTime: number;
  remainingTime: number;
  isOver: boolean;
}

export const TimeBar: React.FC<TimeBarProps> = ({
  totalTime,
  remainingTime,
  isOver,
}): JSX.Element => {
  const initialWidth = 100 - (100 * remainingTime) / totalTime + "%";
  const barContainerRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);

  const [barCurrentWidth, setBarCurrentWidth] = React.useState<number>();

  React.useEffect(() => {
    if (barRef.current?.clientWidth) setBarCurrentWidth(barRef.current?.clientWidth);
  }, []);

  return (
    <BarContainer ref={barContainerRef} className="d-flex justify-start">
      <Bar
        ref={barRef}
        initialWidth={initialWidth}
        remainingTime={remainingTime}
        isOver={isOver}
        currentWidth={barCurrentWidth as number}
        containerWidth={barContainerRef.current?.clientWidth as number}
        opacity={remainingTime ? 1 : 0}
      />
    </BarContainer>
  );
};

const BarContainer = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${EStyles.darken_darkBlue};
  border-radius: 5px;
`;

const Bar = styled.div<{
  initialWidth: string;
  remainingTime: number;
  isOver: boolean;
  currentWidth: number;
  containerWidth: number;
  opacity: number;
}>`
  width: 100%;
  height: 40px;
  background: linear-gradient(to bottom, ${EStyles.red} 20%, ${EStyles.darken_redOrange} 100%);
  border-radius: 5px;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s;
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
      width: ${(props) => `${(props.currentWidth / (props.containerWidth - 20)) * 100}%`};
    }
  }
`;
