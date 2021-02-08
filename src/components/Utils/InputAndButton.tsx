import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";

interface InputAndButtonProps {
  handleSubmit: (name: string) => void;
  buttonLabel: string;
  inputWidth?: number;
  margin?: string;
  placeholder?: string;
  valueMaxLength?: number;
  show?: boolean;
}

const InputAndButton: React.FC<InputAndButtonProps> = ({
  handleSubmit,
  buttonLabel,
  inputWidth = 250,
  margin = "0",
  placeholder = "",
  valueMaxLength = 100,
  show = true,
}): JSX.Element => {
  const [value, setValue] = React.useState<string>("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.length > 0) {
          handleSubmit(value);
        }
      }}
      margin={margin}
      show={show}
      className="d-flex justify-center align-center"
    >
      <Input
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= valueMaxLength) {
            setValue(e.target.value);
          }
        }}
        inputWidth={inputWidth}
        className="d-flex"
        placeholder={placeholder}
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
