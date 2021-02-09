import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  margin?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  hoverColor?: string;
  show?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled = false,
  margin = "10px",
  color = "white",
  backgroundColor = EStyles.lightBlue,
  hoverColor = EStyles.darken_lightBlue,
  borderColor = EStyles.lightBlue,
  show = true,
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
      show={show}
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
  show: boolean;
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
  display: ${(props) => (props.show ? "flex" : "none")};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  font-weight: 500;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

export default Button;
