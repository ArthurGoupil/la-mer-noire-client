import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";

interface InputAndButtonProps {
  handleSubmit: (name: string) => void;
  buttonLabel: string;
  inputWidth?: number;
  margin?: string;
  placeholder?: string;
  show?: boolean;
}

const InputAndButton: React.FC<InputAndButtonProps> = ({
  handleSubmit,
  buttonLabel,
  inputWidth = 250,
  margin = "0",
  placeholder = "",
  show = true,
}): JSX.Element => {
  let inputValue: HTMLInputElement | null;

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue?.value) {
          handleSubmit(inputValue.value);
          inputValue.value = "";
        }
      }}
      margin={margin}
      show={show}
      className="d-flex justify-center align-center"
    >
      <Input
        ref={(node) => {
          inputValue = node;
        }}
        inputWidth={inputWidth}
        placeholder={placeholder}
        className="d-flex"
      />
      <Button type="submit">{buttonLabel}</Button>
    </Form>
  );
};

const Form = styled.form<{ margin: string; show: boolean }>`
  margin: ${(props) => props.margin};
  display: ${(props) => (props.show ? "flex" : "none")};

  @media only screen and (max-width: ${EStyles.mobileBreakPoint}) {
    flex-direction: column;
  }
`;

const Input = styled.input<{ inputWidth: number }>`
  width: ${(props) => props.inputWidth}px;
  text-align: center;
  padding: 10px;
  border-radius: 100px;
  border: 5px solid ${EStyles.orange};
  outline: none;
  transition: 0.2s border;

  &::placeholder {
    font-style: italic;
    color: #b8b8b8;
  }

  &:focus {
    border: 5px solid ${EStyles.darken_orange};
  }
`;

const Button = styled.button`
  color: white;
  background-color: ${EStyles.orange};
  text-align: center;
  padding: 10px;
  margin: 10px;
  border-radius: 100px;
  outline: none;
  border: 5px solid ${EStyles.orange};
  transition: 0.2s background-color;
  white-space: nowrap;

  &:hover {
    background-color: ${EStyles.darken_orange};
  }
`;

export default InputAndButton;
