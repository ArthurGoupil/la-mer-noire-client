import React from "react";
import styled from "styled-components";
import { Trophy } from "./Trophy";

interface ScubaDiverRacerProps {
  playerName: string;
  diverNumber: number;
  height: number;
  containerWidth: number;
  answersFactor: number;
  playerRanking: number;
}

export const ScubaDiverRacer: React.FC<ScubaDiverRacerProps> = ({
  playerName,
  diverNumber,
  height,
  containerWidth,
  answersFactor,
  playerRanking,
}): JSX.Element => {
  const [shouldSwim, setShouldSwim] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (answersFactor !== 0) {
      setShouldSwim(true);
      setTimeout(() => {
        setShouldSwim(false);
      }, 1000);
    }
  }, [answersFactor]);

  const firstLegAnimation = shouldSwim
    ? "swimFirstLeg 0.3s alternate infinite ease-in-out"
    : "moveFirstLeg 0.3s alternate infinite ease-in-out";
  const secondLegAnimation = shouldSwim
    ? "swimSecondLeg 0.3s alternate infinite ease-in-out"
    : "moveSecondLeg 0.3s alternate infinite ease-in-out";

  const trophySrc = { 1: "/icons/trophy.svg", 2: "/icons/silver.svg", 3: "/icons/bronze.svg" }[
    playerRanking
  ];

  return (
    <ScubaDiverRacerContainer
      width={height * 2.5 + 150}
      height={height}
      transform={`translateX(${((containerWidth - 150) / 11) * answersFactor}px)`}
    >
      <PlayerName>{playerName.toUpperCase()}</PlayerName>
      <ScubaDiverContainer width={height * 2.5}>
        <DiverSecondLeg
          src={`/divers/diver${diverNumber}-leg2.svg`}
          animation={secondLegAnimation}
        />
        <Diver src={`/divers/diver${diverNumber}.svg`} />
        <DiverFirstLeg src={`/divers/diver${diverNumber}-leg1.svg`} animation={firstLegAnimation} />
      </ScubaDiverContainer>
      <TrophyContainer opacity={trophySrc ? 1 : 0}>
        {trophySrc && <Trophy src={trophySrc} width="40px" />}
      </TrophyContainer>
    </ScubaDiverRacerContainer>
  );
};

const ScubaDiverRacerContainer = styled.div<{
  width: number;
  height: number;
  transform: string;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  transform: ${(props) => props.transform};
  transition: transform 1s;
  z-index: 1;
`;

const ScubaDiverContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  height: 100%;
  position: absolute;
  right: 0;
`;

const PlayerName = styled.div`
  width: 150px;
  padding: 5px 10px;
  font-family: "Boogaloo", cursive;
  position: absolute;
  left: 0;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 5px;
  mask-image: linear-gradient(to right, white 90%, transparent 100%);
`;

const Diver = styled.img`
  width: 53%;
  position: absolute;
  right: 0;
`;

const DiverLeg = styled.img`
  width: 47%;
  left: 9%;
  top: 17%;
  transform: rotate(-4deg);
  transform-origin: right;
  position: absolute;

  @keyframes swimFirstLeg {
    from {
      transform: rotate(-20deg);
    }
    to {
      transform: rotate(20deg);
    }
  }

  @keyframes swimSecondLeg {
    from {
      transform: rotate(20deg);
    }
    to {
      transform: rotate(-20deg);
    }
  }

  @keyframes moveFirstLeg {
    from {
      transform: rotate(-5deg);
    }
    to {
      transform: rotate(5deg);
    }
  }

  @keyframes moveSecondLeg {
    from {
      transform: rotate(5deg);
    }
    to {
      transform: rotate(-5deg);
    }
  }
`;

const DiverFirstLeg = styled(DiverLeg)<{ animation: string }>`
  transform: rotate(-4deg);
  animation: ${(props) => props.animation};
  transition: animation-duration 0.2s;
`;

const DiverSecondLeg = styled(DiverLeg)<{ animation: string }>`
  top: 18%;
  transform: rotate(4deg);
  animation: ${(props) => props.animation};
  transition: animation-duration 0.2s;
`;

const TrophyContainer = styled.div<{ opacity: number }>`
  position: absolute;
  right: 22%;
  bottom: 5%;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s;
`;
