import React from "react";
import styled from "styled-components";

interface LoaderProps {
  containerHeight?: string;
}

const Loader: React.FC<LoaderProps> = ({
  containerHeight = "100%",
}): JSX.Element => {
  return (
    <LoaderContainer
      className="d-flex justify-center align-center"
      containerHeight={containerHeight}
    >
      <Bubble />
      <BubbleAnimate />
      <BubbleAnimateDelay />
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled.div.attrs(
  (props: { containerHeight: string }) => ({
    containerHeight: props.containerHeight,
  }),
)`
  position: relative;
  width: 100%;
  height: ${(props) => props.containerHeight};
  display: inline-block;
  margin: 0 auto;
`;

const Bubble = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  right: 0;
  margin: 0 auto;
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  opacity: 0;
`;

const BubbleAnimate = styled(Bubble)`
  -webkit-animation: bubbleEffect 2s ease-out infinite;
  -moz-animation: bubbleEffect 2s ease-out infinite;
  -ms-animation: bubbleEffect 2s ease-out infinite;
  -o-animation: bubbleEffect 2s ease-out infinite;
  animation: bubbleEffect 2s ease-out infinite;
`;

const BubbleAnimateDelay = styled(BubbleAnimate)`
  -webkit-animation: bubbleEffect 2s ease-out 1s infinite;
  -moz-animation: bubbleEffect 2s ease-out 1s infinite;
  -ms-animation: bubbleEffect 2s ease-out 1s infinite;
  -o-animation: bubbleEffect 2s ease-out 1s infinite;
  animation: bubbleEffect 2s ease-out 1s infinite;

  @-webkit-keyframes bubbleEffect {
    0% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(10);
      -moz-transform: scale(10);
      -ms-transform: scale(10);
      -o-transform: scale(10);
      transform: scale(10);
      opacity: 0;
    }
  }
  @keyframes bubbleEffect {
    0% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(10);
      -moz-transform: scale(10);
      -ms-transform: scale(10);
      -o-transform: scale(10);
      transform: scale(10);
      opacity: 0;
    }
  }
`;
