import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import {
  GET_GAME,
  GAME_PLAYERS_CHANGED_SUBSCRIPTION,
  ADD_PLAYER_TO_GAME,
} from "../service/games";
import { shortId } from "../models/Game";
import FullContainer from "../components/Utils/FullContainer";
import LMNLogo from "../components/Utils/LMNLogo";
import {
  smallSpace,
  mainYellow,
  mainRedOrange,
  normalSpace,
  mainTurquoise,
  darken_mainTurquoise,
  mainDarkBlue,
} from "../styles/StylingVariables";
import Loader from "../components/Utils/Loader";
import GameCodeBloc from "../components/Game/GameCodeBloc";
import ItemsList from "../components/Utils/ItemsList";
import InputAndButton from "../components/Utils/InputAndButton";
import { CREATE_PLAYER } from "../service/players";
import Button from "../components/Utils/Button";

const Home: React.FC<{}> = (): JSX.Element => {
  const history = useHistory();
  const { shortId } = useParams<shortId>();
  const [launchCounter, setLaunchCounter] = React.useState<number | null>(null);

  const [
    createPlayer,
    { loading: playerLoading, error: playerError },
  ] = useMutation(CREATE_PLAYER);
  const [
    addPlayerToGame,
    { loading: addPlayerLoading, error: addPlayerError },
  ] = useMutation(ADD_PLAYER_TO_GAME);

  const {
    subscribeToMore,
    loading: gameLoading,
    error: gameError,
    data: gameData,
  } = useQuery(GET_GAME, {
    variables: { shortId },
  });

  React.useEffect(() => {
    subscribeToMore({
      document: GAME_PLAYERS_CHANGED_SUBSCRIPTION,
      variables: { shortId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.gamePlayersChanged;
        return newFeedItem;
      },
    });
  }, [subscribeToMore, shortId]);

  const handleSubmit = async (name: string) => {
    const createdPlayer = (await createPlayer({ variables: { name } })).data
      .createPlayer;
    await addPlayerToGame({
      variables: { playerId: createdPlayer._id, shortId },
    });
    history.push(`/games/${shortId}/${createdPlayer._id}`);
  };

  React.useEffect(() => {
    console.log(launchCounter);
    let timeout: NodeJS.Timeout;

    if (launchCounter && launchCounter > 0) {
      timeout = setTimeout(() => {
        setLaunchCounter(launchCounter - 1);
      }, 1000);
    } else if (launchCounter === 0) {
      alert("yo");
    }

    return () => clearTimeout(timeout);
  }, [launchCounter]);

  const handleLaunch = () => {
    if (!launchCounter) {
      setLaunchCounter(5);
    } else {
      setLaunchCounter(null);
    }
  };

  if (gameError) return <div>{`Error! ${gameError.message}`}</div>;

  return (
    <FullContainer className="d-flex flex-column align-center">
      {!gameLoading ? (
        <>
          <LMNLogo width="400px" margin={`${smallSpace} 0 ${smallSpace} 0`} />
          <GameName>{gameData.getGame.name.toUpperCase()}</GameName>
          <GameCodeBloc gameCode={gameData.getGame.shortId} />
          <InputAndButton
            handleSubmit={handleSubmit}
            buttonLabel="Rejoindre la partie"
            placeholder="My lovely name"
          />
          <ItemsList
            list={gameData.getGame.players}
            labelKey="name"
            className="d-flex justify-center flex-wrap"
            maxWidth="600px"
            margin={`0 0 ${normalSpace} 0`}
          />
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
        </>
      ) : (
        <Loader containerHeight="100vh" />
      )}
    </FullContainer>
  );
};

const GameName = styled.h1`
  color: ${mainYellow};
  text-shadow: 3px 3px 0 ${mainRedOrange};
  margin-bottom: ${normalSpace};
`;

export default Home;
