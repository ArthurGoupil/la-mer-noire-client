import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";
import { Loader } from "./Loader";

interface InputAndButtonProps {
  handleSubmit: (value: string) => void;
  buttonLabel: string;
  inputWidth?: string;
  fontSize?: string;
  padding?: string;
  margin?: string;
  placeholder?: string;
  valueMaxLength?: number;
  isLoading?: boolean;
  hideRemainingLetters?: boolean;
}

export const InputAndButton: React.FC<InputAndButtonProps> = ({
  handleSubmit,
  buttonLabel,
  inputWidth = "250px",
  fontSize = "18px",
  padding = "10px 30px 10px 10px",
  margin = "0",
  placeholder = "",
  valueMaxLength = 50,
  isLoading = false,
  hideRemainingLetters = false,
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
      <InputContainer className="d-flex align-center">
        <Input
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= valueMaxLength) {
              setValue(e.target.value);
            }
          }}
          inputWidth={inputWidth}
          fontSize={fontSize}
          padding={padding}
          className="d-flex"
          placeholder={placeholder}
        />
        {!hideRemainingLetters && (
          <RemainingLetters color={valueMaxLength - value.length > 0 ? Styles.good : Styles.wrong}>
            {valueMaxLength - value.length}
          </RemainingLetters>
        )}
      </InputContainer>
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

  @media only screen and (max-width: ${Styles.mobileBreakPoint}) {
    flex-direction: column;
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input<{ inputWidth: string; fontSize: string; padding: string }>`
  width: ${(props) => props.inputWidth};
  font-size: ${(props) => props.fontSize};
  text-align: center;
  padding: ${(props) => props.padding};
  border-radius: 100px;
  border: 5px solid ${Styles.lightBlue};
  outline: none;
  transition: 0.2s border;

  &::placeholder {
    font-style: italic;
    color: #b8b8b8;
  }

  &:focus {
    border: 5px solid ${Styles.darken_lightBlue};
  }
`;

const RemainingLetters = styled.span<{ color: string }>`
  font-family: Boogaloo, cursive;
  color: ${(props) => props.color};
  position: absolute;
  right: 15px;
  margin-bottom: 15px;
`;

const Button = styled.button<{ isDisabled: boolean }>`
  background-color: ${Styles.lightBlue};
  text-align: center;
  padding: 10px;
  margin: 10px;
  border-radius: 100px;
  outline: none;
  border: 5px solid ${Styles.lightBlue};
  transition: 0.2s background-color;
  white-space: nowrap;
  font-weight: 500;
  opacity: ${(props) => (props.isDisabled ? 0.7 : 1)};
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.isDisabled ? Styles.lightBlue : Styles.darken_lightBlue)};
  }
`;

const LabelContainer = styled.div<{ isLoading: boolean }>`
  opacity: ${(props) => (props.isLoading ? 0 : 1)};
`;
