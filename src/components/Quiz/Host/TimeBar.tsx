import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";
import { useSound } from "hooks/others/useSound.hook";
import { HostSounds } from "constants/Sounds.constants";

interface TimeBarProps {
  displayTimeBar: boolean;
  duration: number;
  timestamp: number | null;
  isOver: boolean;
  shouldAnimateToEnd: boolean;
  soundShouldStop: boolean;
  backgroundGradient: string[];
}

interface TimeBarSubContainerProps extends Omit<Omit<TimeBarProps, "timestamp">, "displayTimeBar"> {
  barContainerWidth: number | undefined;
  remainingTime: number;
}

export const TimeBar: React.FC<TimeBarProps> = ({
  displayTimeBar,
  duration,
  timestamp,
  isOver,
  shouldAnimateToEnd,
  soundShouldStop,
  backgroundGradient,
}): JSX.Element => {
  const barContainerRef = React.useRef<HTMLDivElement>(null);
  const remainingTime = timestamp ? Math.round(timestamp + duration - Date.now() / 1000) : duration;

  return (
    <BarContainer ref={barContainerRef} className="d-flex justify-start">
      {displayTimeBar && timestamp && (
        <TimeBarSubContainer
          isOver={isOver}
          remainingTime={remainingTime}
          duration={duration}
          backgroundGradient={backgroundGradient}
          barContainerWidth={barContainerRef.current?.clientWidth}
          shouldAnimateToEnd={shouldAnimateToEnd}
          soundShouldStop={soundShouldStop}
        />
      )}
    </BarContainer>
  );
};

const TimeBarSubContainer = ({
  isOver,
  remainingTime,
  duration,
  backgroundGradient,
  barContainerWidth,
  shouldAnimateToEnd,
  soundShouldStop,
}: TimeBarSubContainerProps) => {
  const barRef = React.useRef<HTMLDivElement>(null);
  const { play, stop, isPlaying } = useSound({ sound: HostSounds.quizOver });

  const remainingTimeRef = React.useRef<number>(remainingTime);
  const [animationString, setAnimationString] = React.useState<string>(
    `normalTransformX ${remainingTimeRef.current || duration}s linear`,
  );

  React.useEffect(() => {
    if (shouldAnimateToEnd) {
      setAnimationString("overTransformX 0.7s ease-out");
    }
  }, [shouldAnimateToEnd]);

  const quizOverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (quizOverTimeoutRef.current) {
        clearTimeout(quizOverTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!quizOverTimeoutRef.current && !isOver && remainingTimeRef.current > 5) {
      quizOverTimeoutRef.current = setTimeout(() => {
        play();
      }, remainingTimeRef.current * 1000 - 4000);
    }

    if (soundShouldStop) {
      if (quizOverTimeoutRef.current) {
        clearTimeout(quizOverTimeoutRef.current);
      }
      if (isPlaying) {
        stop();
      }
    }
  }, [isOver, isPlaying, play, soundShouldStop, stop]);

  const initialWidth = `${100 - (100 * (remainingTimeRef.current || duration)) / duration}%`;

  const overInitialWidth = barContainerWidth
    ? `${((barRef.current?.clientWidth || 0) / (barContainerWidth - 20)) * 100}%`
    : "0";

  return (
    <Bar
      ref={barRef}
      initialWidth={initialWidth}
      overInitialWidth={overInitialWidth}
      animation={animationString || `normalTransformX ${duration}s linear`}
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
