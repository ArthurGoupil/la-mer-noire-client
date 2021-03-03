import React from "react";
import { FullHeightLayout } from "./FullHeightLayout";
import { Loader } from "./Loader";

export const FullHeightLoader: React.FC = (): JSX.Element => {
  return (
    <FullHeightLayout className="d-flex justify-center align-center">
      <Loader />
    </FullHeightLayout>
  );
};
