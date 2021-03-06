import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { FullHeightLayout } from "components/Utils/FullHeightLayout";

interface FullScreenErrorProps {
  errorLabel: string;
  link?: string;
  linkLabel?: string;
}

export const FullScreenError: React.FC<FullScreenErrorProps> = ({
  errorLabel,
  link,
  linkLabel,
}): JSX.Element => {
  return (
    <FullHeightLayout className="d-flex flex-column align-center justify-center">
      <ErrorWrapper>{errorLabel}</ErrorWrapper>
      {link && linkLabel && (
        <LinkWrapper>
          <Link to={link}>{linkLabel}</Link>
        </LinkWrapper>
      )}
    </FullHeightLayout>
  );
};

const ErrorWrapper = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
`;
const LinkWrapper = styled.div`
  text-decoration: underline;
  text-align: center;
`;
