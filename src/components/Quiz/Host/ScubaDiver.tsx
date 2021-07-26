import React from "react";
import styled from "styled-components";

export const ScubaDiver: React.FC<{}> = (): JSX.Element => {
  return (
    <ScubaDiverContainer width={height * 2.5}>
      <DiverSecondLeg src={`/divers/diver${diverNumber}-leg2.svg`} animation={secondLegAnimation} />
      <Diver src={`/divers/diver${diverNumber}.svg`} />
      <DiverFirstLeg src={`/divers/diver${diverNumber}-leg1.svg`} animation={firstLegAnimation} />
    </ScubaDiverContainer>
  );
};

const ScubaDiverContainer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  height: 100%;
  position: absolute;
  right: 0;
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
