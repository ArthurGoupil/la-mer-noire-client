import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

import {
  ADD_PLAYER_TO_GAME,
  UPDATE_GAME_CURRENT_STATE,
} from "../../../service/games";
import { CREATE_PLAYER } from "../../../service/players";
import GameCodeBloc from "../GameCodeBloc";
import ItemsList from "../../Utils/ItemsList";
import InputAndButton from "../../Utils/InputAndButton";
import Button from "../../Utils/Button";
import { Game } from "../../../models/Game";
import {
  smallSpace,
  mainYellow,
  mainRedOrange,
  normalSpace,
  mainTurquoise,
  darken_mainTurquoise,
  mainDarkBlue,
} from "../../../styles/StylingVariables";

interface GameJoinProps {
  shortId: string;
  userType: string;
  gameData: {
    getGame: Game;
  };
}

const GameJoin: React.FC<GameJoinProps> = ({
  shortId,
  userType,
  gameData,
}): JSX.Element => {
  const history = useHistory();
  const [launchCounter, setLaunchCounter] = React.useState<number | null>(null);
  const [updateGameCurrentState] = useMutation(UPDATE_GAME_CURRENT_STATE);

  console.log(gameData);

  const handleSubmit = async (name: string) => {
    const [createPlayer] = useMutation(CREATE_PLAYER);
    const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);

    const createdPlayer = (await createPlayer({ variables: { name } })).data
      .createPlayer;
    await addPlayerToGame({
      variables: { playerId: createdPlayer._id, shortId },
    });
    history.push(`/games/${shortId}/${createdPlayer._id}`);
  };

  const handleLaunch = () => {
    if (!launchCounter) {
      setLaunchCounter(5);
    } else {
      setLaunchCounter(null);
    }
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (launchCounter && launchCounter > 0) {
      timeout = setTimeout(() => {
        setLaunchCounter(launchCounter - 1);
      }, 1000);
    } else if (launchCounter === 0) {
      const handleChangeState = async () => {
        await updateGameCurrentState({
          variables: { currentState: { type: "question" }, shortId },
        });
      };
      handleChangeState();
      alert("yo");
    }

    return () => clearTimeout(timeout);
  }, [launchCounter]);

  return (
    <>
      <GameName>{gameData.getGame.name.toUpperCase()}</GameName>
      <div className="d-flex flex-column align-center">
        <GameCodeBloc gameCode={gameData.getGame.shortId} />
        {userType === "join" && (
          <InputAndButton
            handleSubmit={handleSubmit}
            buttonLabel="Rejoindre la partie"
            placeholder="My lovely name"
            margin={`0 0 ${smallSpace} 0`}
          />
        )}
        <ItemsList
          list={gameData.getGame.players}
          labelKey="name"
          className="d-flex justify-center flex-wrap"
          maxWidth="600px"
          margin={`0 0 ${normalSpace} 0`}
        />
      </div>
      {userType === "host" && (
        <Button
          onClick={handleLaunch}
          label={
            launchCounter
              ? `Lancement dans ... ${launchCounter.toString()}s (cliquez pour annuler)`
              : "Tout le monde est prêt !"
          }
          color={mainDarkBlue}
          backgroundColor={mainTurquoise}
          hoverColor={darken_mainTurquoise}
        />
      )}
      ;
    </>
  );
};

const GameName = styled.h1`
  color: ${mainYellow};
  text-shadow: 3px 3px 0 ${mainRedOrange};
  margin-bottom: ${normalSpace};
`;

export default GameJoin;
