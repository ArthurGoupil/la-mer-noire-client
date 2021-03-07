import React from "react";
import styled from "styled-components";

export const WaveSeparator: React.FC = (): JSX.Element => {
  return <WaveSeparatorContainer />;
};

const WaveSeparatorContainer = styled.div`
  width: 202px;
  height: 10px;
  background-image: url("/icons/wave-pattern.svg");
  border-radius: 5px;
  margin: 30px 0;
`;
