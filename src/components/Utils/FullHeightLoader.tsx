import React from "react";
import { FullHeightContainer } from "./FullHeightContainer";
import { Loader } from "./Loader";

export const FullHeightLoader: React.FC = (): JSX.Element => {
  return (
    <FullHeightContainer className="d-flex justify-center align-center">
      <Loader />
    </FullHeightContainer>
  );
};
