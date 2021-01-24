import React from "react";
import styled from "styled-components";
import {
  mainOrange,
  darken_mainOrange,
  mobileBreakPoint,
} from "../../styles/StylingVariables";

interface InputAndButtonProps {
  handleSubmit: (name: string) => void;
  buttonLabel: string;
  inputWidth?: number;
  margin?: string;
  placeholder?: string;
}

const InputAndButton: React.FC<InputAndButtonProps> = ({
  handleSubmit,
  buttonLabel,
  inputWidth = 250,
  margin = "0",
  placeholder = "",
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

const Form = styled.form.attrs((props: { margin: string }) => ({
  margin: props.margin,
}))`
  margin: ${(props) => props.margin};

  @media only screen and (max-width: ${mobileBreakPoint}) {
    flex-direction: column;
  }
`;

const Input = styled.input.attrs((props: { inputWidth: number }) => ({
  inputWidth: props.inputWidth,
}))`
  width: ${(props) => props.inputWidth}px;
  text-align: center;
  padding: 10px;
  border-radius: 100px;
  border: 5px solid ${mainOrange};
  outline: none;
  transition: 0.2s border;

  &::placeholder {
    font-style: italic;
    color: #b8b8b8;
  }

  &:focus {
    border: 5px solid ${darken_mainOrange};
  }
`;

const Button = styled.button`
  color: white;
  background-color: ${mainOrange};
  text-align: center;
  padding: 10px;
  margin: 10px;
  border-radius: 100px;
  outline: none;
  border: 5px solid ${mainOrange};
  transition: 0.2s background-color;
  white-space: nowrap;

  &:hover {
    background-color: ${darken_mainOrange};
  }
`;

export default InputAndButton;
