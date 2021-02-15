import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { Loader } from "./Loader";

interface InputAndButtonProps {
  handleSubmit: (value: string) => void;
  buttonLabel: string;
  inputWidth?: number;
  margin?: string;
  placeholder?: string;
  valueMaxLength?: number;
  isLoading?: boolean;
}

export const InputAndButton: React.FC<InputAndButtonProps> = ({
  handleSubmit,
  buttonLabel,
  inputWidth = 250,
  margin = "0",
  placeholder = "",
  valueMaxLength = 100,
  isLoading = false,
}): JSX.Element => {
  const [value, setValue] = React.useState<string>("");

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        if (value.length > 0) {
          handleSubmit(value);
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
        className="d-flex"
        placeholder={placeholder}
      />
      <Button type="submit" className="d-flex justify-center align-center">
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

const Input = styled.input<{ inputWidth: number }>`
  width: ${(props) => props.inputWidth}px;
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

const Button = styled.button`
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

  &:hover {
    background-color: ${EStyles.darken_lightBlue};
  }
`;

const LabelContainer = styled.div<{ isLoading: boolean }>`
  opacity: ${(props) => (props.isLoading ? 0 : 1)};
`;
