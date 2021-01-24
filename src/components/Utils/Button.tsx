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
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  margin = "10px",
  color = "white",
  backgroundColor = EStyles.mainOrange,
  hoverColor = EStyles.darken_mainOrange,
  border = "none",
}): JSX.Element => {
  return (
    <StyledButton
      onClick={onClick}
      margin={margin}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      border={border}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button.attrs(
  (props: {
    margin: string;
    color: string;
    backgroundColor: string;
    hoverColor: string;
    border: string;
  }) => ({
    margin: props.margin,
    color: props.color,
    backgroundColor: props.backgroundColor,
    hoverColor: props.hoverColor,
    border: props.border,
  }),
)`
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

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

export default Button;
