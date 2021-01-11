import React from "react";
import { useMutation } from "@apollo/client";
import { GET_GAMES, ADD_GAME } from "../../service/games";

const AddTodo: React.FC<{}> = (): JSX.Element => {
  const [addGame] = useMutation(ADD_GAME, {
    refetchQueries: [{ query: GET_GAMES }],
  });
  const handleGameNameSubmit = (name: string) => {
    addGame({ variables: { name } });
  };

  let inputValue: HTMLInputElement | null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue?.value) {
          handleGameNameSubmit(inputValue.value);
          inputValue.value = "";
        }
      }}
    >
      <input
        ref={(node) => {
          inputValue = node;
        }}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default AddTodo;
