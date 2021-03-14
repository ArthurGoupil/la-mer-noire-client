import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";
import { useSound } from "hooks/others/useSound.hook";
import { Sounds } from "constants/Sounds.constants";

interface TimeBarProps {
  totalTime: number;
  remainingTime: number | null;
  isOver: boolean;
  soundShouldStop: boolean;
  backgroundGradient: string[];
}

export const TimeBar: React.FC<TimeBarProps> = ({
  totalTime,
  remainingTime,
  isOver,
  soundShouldStop,
  backgroundGradient,
}): JSX.Element => {
  const { play, stop, isPlaying } = useSound({ sound: Sounds.quizOver });

  const barContainerRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLDivElement>(null);

  const getInitialWidth = (): string => {
    if (remainingTime !== null) {
      // 100.5 to let a margin so that TB doesn't appear full at beginning of quiz
      return `${100.5 - (100 * remainingTime) / totalTime}%`;
    }
    return "0%";
  };

  const getAnimationString = (): string => {
    if (!isOver && remainingTime) {
      return `normalTransformX ${remainingTime}s linear`;
    }
    return "overTransformX 0.7s ease-out";
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!timeout && remainingTime && remainingTime > 5) {
      timeout = setTimeout(() => {
        play();
      }, remainingTime * 1000 - 4000);
    }

    if (soundShouldStop) {
      if (timeout) {
        clearTimeout(timeout);
      } else if (isPlaying) {
        stop();
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [play, remainingTime, isPlaying, stop, soundShouldStop]);

  return (
    <BarContainer ref={barContainerRef} className="d-flex justify-start">
      <Bar
        ref={barRef}
        initialWidth={getInitialWidth()}
        overInitialWidth={`${
          ((barRef.current?.clientWidth || 0) /
            ((barContainerRef.current?.clientWidth || 0) - 20)) *
          100
        }%`}
        animation={getAnimationString()}
        opacity={remainingTime !== null ? 1 : 0}
        background={`linear-gradient(to bottom, ${backgroundGradient[0]} 20%, ${backgroundGradient[1]} 100%);`}
      />
    </BarContainer>
  );
};

const BarContainer = styled.div`
  width: 100%;
  height: 60px;
  padding: 10px;
  background-color: ${Styles.darken_darkBlue};
  border-radius: 5px;
`;

const Bar = styled.div<{
  initialWidth: string;
  overInitialWidth: string;
  animation: string;
  opacity: number;
  background: string;
}>`
  width: 100%;
  height: 40px;
  background: ${(props) => props.background};
  border-radius: 5px;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s;
  animation: ${(props) => props.animation};

  @keyframes normalTransformX {
    from {
      width: ${(props) => props.initialWidth};
    }
  }
  @keyframes overTransformX {
    from {
      width: ${(props) => props.overInitialWidth};
    }
  }
`;
