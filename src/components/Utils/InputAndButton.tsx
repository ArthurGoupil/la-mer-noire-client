import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { Loader } from "./Loader";

interface InputAndButtonProps {
  handleSubmit: (value: string) => void;
  buttonLabel: string;
  inputWidth?: number;
  fontSize?: number;
  margin?: string;
  placeholder?: string;
  valueMaxLength?: number;
  isLoading?: boolean;
}

export const InputAndButton: React.FC<InputAndButtonProps> = ({
  handleSubmit,
  buttonLabel,
  inputWidth = 250,
  fontSize = 18,
  margin = "0",
  placeholder = "",
  valueMaxLength = 50,
  isLoading = false,
}): JSX.Element => {
  const [value, setValue] = React.useState<string>("");

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        if (value.length > 0) {
          handleSubmit(value.trim());
        }
      }}
      margin={margin}
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
        fontSize={fontSize}
        className="d-flex"
        placeholder={placeholder}
      />
      <Button
        disabled={value.trim().length === 0}
        type="submit"
        className="d-flex justify-center align-center"
        isDisabled={value.trim().length === 0}
      >
        <LabelContainer isLoading={isLoading}>{buttonLabel}</LabelContainer>
        {isLoading && <Loader isForButton />}
      </Button>
    </Form>
  );
};

const Form = styled.form<{ margin: string }>`
  margin: ${(props) => props.margin};

  @media only screen and (max-width: ${EStyles.mobileBreakPoint}) {
    flex-direction: column;
  }
`;

const Input = styled.input<{ inputWidth: number; fontSize: number }>`
  width: ${(props) => props.inputWidth}px;
  font-size: ${(props) => props.fontSize}px;
  text-align: center;
  padding: 10px;
  border-radius: 100px;
  border: 5px solid ${EStyles.lightBlue};
  outline: none;
  transition: 0.2s border;

  &::placeholder {
    font-style: italic;
    color: #b8b8b8;
  }

  &:focus {
    border: 5px solid ${EStyles.darken_lightBlue};
  }
`;

const Button = styled.button<{ isDisabled: boolean }>`
  background-color: ${EStyles.lightBlue};
  text-align: center;
  padding: 10px;
  margin: 10px;
  border-radius: 100px;
  outline: none;
  border: 5px solid ${EStyles.lightBlue};
  transition: 0.2s background-color;
  white-space: nowrap;
  font-weight: 500;
  opacity: ${(props) => (props.isDisabled ? 0.7 : 1)};
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) =>
      props.isDisabled ? EStyles.lightBlue : EStyles.darken_lightBlue};
  }
`;

const LabelContainer = styled.div<{ isLoading: boolean }>`
  opacity: ${(props) => (props.isLoading ? 0 : 1)};
`;
