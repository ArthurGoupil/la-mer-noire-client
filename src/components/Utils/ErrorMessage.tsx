import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";

interface ErrorMessageProps {
  errorMessage: string | null;
  isDisplayed: boolean;
  margin?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorMessage,
  isDisplayed,
  margin = "0",
}): JSX.Element => {
  return (
    <ErrorMessageContainer margin={margin}>
      {isDisplayed && errorMessage ? errorMessage : <>&nbsp;</>}
    </ErrorMessageContainer>
  );
};

const ErrorMessageContainer = styled.div<{ margin: string }>`
  color: ${Styles.redOrange};
  margin: ${(props) => props.margin};
  font-size: 15px;
  text-align: center;
`;
