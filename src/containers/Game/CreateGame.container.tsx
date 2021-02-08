import { useMutation } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router-dom";

import InputAndButton from "components/Utils/InputAndButton";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import LMNLogo from "components/Utils/LMNLogo";
import { CREATE_GAME } from "services/games.service";
import AnimatedSubmarine from "components/Utils/AnimatedSubmarine";

const CreateGame: React.FC<{}> = (): JSX.Element => {
  const history = useHistory();
  const [createGame] = useMutation(CREATE_GAME);

  const handleSubmit = async (name: string) => {
    const createdGame = (await createGame({ variables: { name } })).data
      .createGame;
    history.push(`/games/${createdGame.shortId}/host`);
  };

  return (
    <FullHeightContainer className="d-flex flex-column align-center justify-center">
      <LMNLogo width="500px" margin={`0 0 20px 0`} />
      <InputAndButton
        handleSubmit={handleSubmit}
        buttonLabel="Créer la partie"
        valueMaxLength={40}
      />
      <AnimatedSubmarine />
    </FullHeightContainer>
  );
};

export default CreateGame;
