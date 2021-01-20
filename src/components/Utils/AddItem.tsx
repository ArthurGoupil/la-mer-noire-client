import React from "react";
import styled from "styled-components";
import { mainOrange } from "../../styles/StylingVariables";

interface AddItemProps {
  handleSubmit: (name: string) => void;
}

const AddItem: React.FC<AddItemProps> = ({ handleSubmit }): JSX.Element => {
  let inputValue: HTMLInputElement | null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue?.value) {
          handleSubmit(inputValue.value);
          inputValue.value = "";
        }
      }}
    >
      <Input
        ref={(node) => {
          inputValue = node;
        }}
      />
      <Button type="submit">Créer la partie</Button>
    </form>
  );
};

const Input = styled.input`
  width: 250px;
  text-align: center;
  padding: 10px;
  border-radius: 100px;
  border: 5px solid ${mainOrange};
  outline: none;
`;

const Button = styled.button`
  color: white;
  background-color: ${mainOrange};
  text-align: center;
  padding: 10px;
  margin: 10px;
  border-radius: 100px;
  border: 5px solid ${mainOrange};
  outline: none;
`;

export default AddItem;
