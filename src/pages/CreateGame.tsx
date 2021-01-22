import { useMutation } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router-dom";
import InputAndButton from "../components/Utils/InputAndButton";
import FullContainer from "../components/Utils/FullContainer";
import LMNLogo from "../components/Utils/LMNLogo";
import { CREATE_GAME, GET_GAMES } from "../service/games";
import { smallSpace } from "../styles/StylingVariables";
import AnimatedSubmarine from "../components/Utils/AnimatedSubmarine";

const CreateGame: React.FC<{}> = (): JSX.Element => {
  const history = useHistory();
  const [createGame] = useMutation(CREATE_GAME, {
    refetchQueries: [{ query: GET_GAMES }],
  });
  const handleSubmit = async (name: string) => {
    const createdGame = (await createGame({ variables: { name } })).data
      .createGame;
    history.push(`/games/${createdGame._id}`);
  };

  return (
    <FullContainer className="d-flex flex-column align-center justify-center">
      <LMNLogo width="500px" margin={`0 0 ${smallSpace} 0`} />
      <InputAndButton
        handleSubmit={handleSubmit}
        buttonLabel="Créer la partie"
      />
      <AnimatedSubmarine />
    </FullContainer>
  );
};

export default CreateGame;
