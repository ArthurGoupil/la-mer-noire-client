import React from "react";
import styled from "styled-components";

interface LoaderProps {
  isForButton?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  isForButton = false,
}): JSX.Element => {
  return <LoaderContainer isForButton={isForButton} />;
};

const LoaderContainer = styled.div<{ isForButton: boolean }>`
  width: ${(props) => (props.isForButton ? "25px" : "70px")};
  height: ${(props) => (props.isForButton ? "25px" : "70px")};
  background-color: white;
  position: absolute;

  border-radius: 100%;
  -webkit-animation: sk-scaleout 1s infinite ease-in-out;
  animation: sk-scaleout 1s infinite ease-in-out;

  @-webkit-keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 0;
    }
  }

  @keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }
`;
