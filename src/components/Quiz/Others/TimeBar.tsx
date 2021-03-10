import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { useSound } from "hooks/others/useSound.hook";
import { ESounds } from "constants/Sounds.constants";

interface TimeBarProps {
  totalTime: number;
  remainingTime: number;
  isOver: boolean;
  backgroundGradient: string[];
}

export const TimeBar: React.FC<TimeBarProps> = ({
  totalTime,
  remainingTime,
  isOver,
  backgroundGradient,
}): JSX.Element => {
  const { play } = useSound({ sound: ESounds.quizOver });
  const initialWidth = 100 - (100 * remainingTime) / totalTime + "%";
  const barContainerRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);

  const [barCurrentWidth, setBarCurrentWidth] = React.useState<number>();
  const [soundTimeoutHasBeenLaunched, setSoundTimeoutHasBeenLaunched] = React.useState<boolean>(
    false,
  );

  React.useEffect(() => {
    if (barRef.current?.clientWidth) {
      setBarCurrentWidth(barRef.current?.clientWidth);
    }
  }, []);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (remainingTime > 5 && !soundTimeoutHasBeenLaunched) {
      setSoundTimeoutHasBeenLaunched(true);
      timeout = setTimeout(() => {
        if (!isOver) {
          play();
        }
      }, remainingTime * 1000 - 4000);
    }

    return () => {
      if (isOver && soundTimeoutHasBeenLaunched) {
        setSoundTimeoutHasBeenLaunched(false);
        clearTimeout(timeout);
      }
    };
  }, [play, remainingTime, soundTimeoutHasBeenLaunched, isOver]);

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
        background={`linear-gradient(to bottom, ${backgroundGradient[0]} 20%, ${backgroundGradient[1]} 100%);`}
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
  background: string;
}>`
  width: 100%;
  height: 40px;
  background: ${(props) => props.background};
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
