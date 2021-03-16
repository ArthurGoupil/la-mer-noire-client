import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";
import { useSound } from "hooks/others/useSound.hook";
import { Sounds } from "constants/Sounds.constants";

interface TimeBarProps {
  timeBarIsVisible: boolean;
  totalTime: number;
  remainingTime: number | null;
  isOver: boolean;
  soundShouldStop: boolean;
  backgroundGradient: string[];
}

interface TimeBarSubContainerProps extends Omit<TimeBarProps, "timeBarIsVisible"> {
  barContainerWidth: number;
  remainingTime: number;
}

export const TimeBar: React.FC<TimeBarProps> = ({
  timeBarIsVisible,
  totalTime,
  remainingTime,
  isOver,
  soundShouldStop,
  backgroundGradient,
}): JSX.Element => {
  const barContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <BarContainer ref={barContainerRef} className="d-flex justify-start">
      {timeBarIsVisible && remainingTime !== null && (
        <TimeBarSubContainer
          remainingTime={remainingTime}
          totalTime={totalTime}
          isOver={isOver}
          backgroundGradient={backgroundGradient}
          barContainerWidth={barContainerRef.current?.clientWidth || 0}
          soundShouldStop={soundShouldStop}
        />
      )}
    </BarContainer>
  );
};

const TimeBarSubContainer = ({
  remainingTime,
  totalTime,
  isOver,
  backgroundGradient,
  barContainerWidth,
  soundShouldStop,
}: TimeBarSubContainerProps) => {
  const barRef = React.useRef<HTMLDivElement>(null);
  const { play, stop, isPlaying } = useSound({ sound: Sounds.quizOver });

  const animationString =
    isOver && remainingTime
      ? "overTransformX 0.7s ease-out"
      : `normalTransformX ${remainingTime}s linear`;

  const quizOverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (quizOverTimeoutRef.current) {
        clearTimeout(quizOverTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!quizOverTimeoutRef.current && !isOver && remainingTime > 5) {
      quizOverTimeoutRef.current = setTimeout(() => {
        play();
      }, remainingTime * 1000 - 4000);
    }

    if (soundShouldStop) {
      if (quizOverTimeoutRef.current) {
        clearTimeout(quizOverTimeoutRef.current);
      } else if (isPlaying) {
        stop();
      }
    }
  }, [isOver, isPlaying, play, remainingTime, soundShouldStop, stop]);

  return (
    <Bar
      ref={barRef}
      initialWidth={`${100 - (100 * remainingTime) / totalTime}%`}
      overInitialWidth={`${((barRef.current?.clientWidth || 0) / (barContainerWidth - 20)) * 100}%`}
      animation={animationString}
      background={`linear-gradient(to bottom, ${backgroundGradient[0]} 20%, ${backgroundGradient[1]} 100%);`}
    />
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
  background: string;
}>`
  width: 100%;
  height: 40px;
  background: ${(props) => props.background};
  border-radius: 5px;
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
