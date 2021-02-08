import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import FullHeightContainer from "components/Utils/FullHeightContainer";

interface FullScreenErrorProps {
  errorLabel: string;
  link?: string;
  linkLabel?: string;
}

const FullScreenError: React.FC<FullScreenErrorProps> = ({
  errorLabel,
  link,
  linkLabel,
}): JSX.Element => {
  return (
    <FullHeightContainer className="d-flex flex-column align-center justify-center">
      <ErrorWrapper>{errorLabel}</ErrorWrapper>
      {link && linkLabel && (
        <LinkWrapper>
          <Link to={link}>{linkLabel}</Link>
        </LinkWrapper>
      )}
    </FullHeightContainer>
  );
};

const ErrorWrapper = styled.div`
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
`;
const LinkWrapper = styled.div`
  color: white;
  text-decoration: underline;
  text-align: center;
`;

export default FullScreenError;
