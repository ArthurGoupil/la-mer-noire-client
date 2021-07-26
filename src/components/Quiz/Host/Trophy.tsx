import React from "react";
import styled from "styled-components";

interface TrophyProps {
  src: string;
  width: string;
}

export const Trophy: React.FC<TrophyProps> = ({ src, width }): JSX.Element => {
  return <TrophyImg src={src} width={width} />;
};

const TrophyImg = styled.img<{ width: string }>`
  width: ${(props) => props.width};
  filter: drop-shadow(0px 0px 50px #ffffff);
  animation: balance 0.3s alternate infinite ease-in-out;

  @keyframes balance {
    from {
      transform: rotate(5deg) scale(0.96);
    }
    to {
      transform: rotate(-5deg) scale(1);
    }
  }
`;
