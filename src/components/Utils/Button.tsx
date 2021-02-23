import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  margin?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  hoverColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled = false,
  margin = "10px",
  color = "white",
  backgroundColor = EStyles.lightBlue,
  hoverColor = EStyles.darken_lightBlue,
  borderColor = EStyles.lightBlue,
}): JSX.Element => {
  return (
    <StyledButton
      className="d-flex justify-center"
      disabled={disabled}
      onClick={onClick}
      margin={margin}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      borderColor={borderColor}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  disabled: boolean;
  margin: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
  hoverColor: string;
}>`
  min-width: 70px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  text-align: center;
  padding: 15px;
  margin: ${(props) => props.margin};
  border-radius: 100px;
  border: ${(props) => `5px solid ${props.borderColor}`};
  outline: none;
  transition: 0.2s background-color;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 500;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? props.backgroundColor : props.hoverColor};
  }
`;
