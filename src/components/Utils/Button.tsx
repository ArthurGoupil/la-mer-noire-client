import React from "react";
import styled from "styled-components";

interface ButtonProps {
  label: string;
  margin?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  margin,
  onClick,
}): JSX.Element => {
  return (
    <ButtonContainer margin={margin}>
      <button onClick={onClick}>{label}</button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div.attrs((props: { margin: string }) => ({
  margin: props.margin,
}))`
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;

export default Button;
