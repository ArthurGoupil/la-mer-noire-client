import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import InputAndButton from "components/Utils/InputAndButton";
import { ADD_PLAYER_TO_GAME } from "services/games.service";
import { CREATE_PLAYER } from "services/players.service";
import { setGameCookies } from "utils/cookies.utils";
import { ECookieName } from "constants/Cookies.constants";
import { EGameStage } from "constants/GameCurrentState.constants";

interface CreatePlayerProps {
  shortId: string;
  show: boolean;
}

const CreatePlayer: React.FC<CreatePlayerProps> = ({
  shortId,
  show,
}): JSX.Element => {
  const history = useHistory();
  const [createPlayer] = useMutation(CREATE_PLAYER);
  const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);
  const handleCreatePlayer = async (name: string) => {
    const createdPlayer = (await createPlayer({ variables: { name } })).data
      .createPlayer;
    setGameCookies([
      {
        prefix: shortId,
        cookieName: ECookieName.playerId,
        cookieValue: createdPlayer._id,
      },
      {
        prefix: shortId,
        cookieName: ECookieName.stage,
        cookieValue: EGameStage.playersRegistration,
      },
    ]);
    await addPlayerToGame({
      variables: { playerId: createdPlayer._id, shortId },
    });
    history.push(`/games/${shortId.toUpperCase()}/play`);
  };

  return (
    <InputAndButton
      handleSubmit={handleCreatePlayer}
      buttonLabel="Rejoindre la partie"
      placeholder="My lovely name"
      margin={`0 0 20px 0`}
      show={show}
    />
  );
};

export default CreatePlayer;
