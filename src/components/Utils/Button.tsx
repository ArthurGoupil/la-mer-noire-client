import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";

interface ButtonProps {
  onClick: () => void;
  label: string;
  margin?: string;
  color?: string;
  backgroundColor?: string;
  hoverColor?: string;
  border?: string;
  show?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  margin = "10px",
  color = "white",
  backgroundColor = EStyles.orange,
  hoverColor = EStyles.darken_orange,
  border = "none",
  show = true,
}): JSX.Element => {
  return (
    <StyledButton
      onClick={onClick}
      margin={margin}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      border={border}
      show={show}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  margin: string;
  color: string;
  backgroundColor: string;
  hoverColor: string;
  border: string;
  show: boolean;
}>`
  min-width: 70px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  text-align: center;
  padding: 15px;
  margin: ${(props) => props.margin};
  border-radius: 100px;
  border: ${(props) => props.border};
  outline: none;
  transition: 0.2s background-color;
  display: ${(props) => (props.show ? "flex" : "none")};

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

export default Button;
