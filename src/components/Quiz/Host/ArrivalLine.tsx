import React from "react";
import styled from "styled-components";

interface ArrivalLineProps {
  containerWidth: number;
}

export const ArrivalLine: React.FC<ArrivalLineProps> = ({ containerWidth }): JSX.Element => {
  return (
    <ArrivalLineContainer right={((containerWidth + 40) / 11) * 10}>
      <pattern
        id="pattern-checkers"
        x="0"
        y="0"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <rect className="checker" x="0" width="10" height="10" y="0"></rect>
        <rect className="checker" x="10" width="10" height="10" y="10"></rect>
      </pattern>

      <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-checkers)"></rect>
    </ArrivalLineContainer>
  );
};

const ArrivalLineContainer = styled.svg<{ right: number }>`
  width: 20px;
  height: 100%;
  position: absolute;
  left: ${(props) => props.right}px;
  background-color: white;
`;
