import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import Cookies from "js-cookie";

import EStyles from "constants/Styling.constants";
import {
  ADD_PLAYER_TO_GAME,
  UPDATE_GAME_CURRENT_STATE,
} from "service/games.service";
import { CREATE_PLAYER } from "service/players.service";
import GameCodeBloc from "components/Game/GameStates/GameJoin/Blocs/GameCodeBloc";
import ItemsList from "components/Utils/ItemsList";
import InputAndButton from "components/Utils/InputAndButton";
import Button from "components/Utils/Button";
import { Game } from "models/Game";
import { EGameCurrentStateStage } from "constants/GameCurrentState.constants";
import { GET_RANDOM_QUIZ } from "service/quizzes.service";
import LMNLogo from "components/Utils/LMNLogo";
import FullContainer from "components/Utils/FullContainer";

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
  const [createPlayer] = useMutation(CREATE_PLAYER);
  const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);
  const [updateGameCurrentState] = useMutation(UPDATE_GAME_CURRENT_STATE);
  const [
    handleLaunchGame,
    { loading: quizLoading, data: quizData },
  ] = useLazyQuery(GET_RANDOM_QUIZ, {
    onCompleted: async () => {
      await updateGameCurrentState({
        variables: {
          currentState: {
            stage: EGameCurrentStateStage.question,
            playersTurn: gameData.getGame.players.map((player) => player._id),
            question: {
              quiz: quizData.getRandomQuiz._id,
              level: "beginner",
              itemId: 1,
            },
          },
          shortId,
        },
      });
    },
  });

  const handleSubmit = async (name: string) => {
    const createdPlayer = (await createPlayer({ variables: { name } })).data
      .createPlayer;
    Cookies.set(shortId, createdPlayer._id, { expires: 1 });

    await addPlayerToGame({
      variables: { playerId: createdPlayer._id, shortId },
    });
    history.push(`/games/${shortId.toUpperCase()}/play`);
  };

  const handleLaunchCounter = () => {
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
      handleLaunchGame();
    }

    return () => clearTimeout(timeout);
  }, [launchCounter]);

  return (
    <FullContainer className="d-flex flex-column align-center">
      <LMNLogo width="400px" margin={`20px 0 20px 0`} />
      <div className="d-flex flex-column align-center space-around flex-grow">
        <GameName>{gameData.getGame.name.toUpperCase()}</GameName>
        <GameCodeBloc
          gameCode={gameData.getGame.shortId}
          show={userType === "host"}
        />
        <InputAndButton
          handleSubmit={handleSubmit}
          buttonLabel="Rejoindre la partie"
          placeholder="My lovely name"
          margin={`0 0 20px 0`}
          show={userType === "join"}
        />
        <div>
          <PlayersTitle show={gameData.getGame.players.length > 0}>
            Dans les starting blocks
          </PlayersTitle>
          <ItemsList
            list={gameData.getGame.players}
            labelKey="name"
            className="d-flex justify-center flex-wrap"
            maxWidth="600px"
            margin={`0 0 40px 0`}
            show={gameData.getGame.players.length > 0}
          />
        </div>
        <Button
          onClick={handleLaunchCounter}
          label={
            launchCounter
              ? `Lancement dans ... ${launchCounter.toString()}s (cliquez pour annuler)`
              : "Tout le monde est prêt !"
          }
          color={EStyles.darkBlue}
          backgroundColor={EStyles.turquoise}
          hoverColor={EStyles.darken_turquoise}
          show={userType === "host"}
        />
      </div>
    </FullContainer>
  );
};

const GameName = styled.h1`
  color: ${EStyles.yellow};
  text-shadow: 3px 3px 0 ${EStyles.redOrange};
  text-align: center;
  margin-bottom: 20px;
`;
const PlayersTitle = styled.h2<{ show: boolean }>`
  color: ${EStyles.orange};
  text-shadow: 3px 3px 0 ${EStyles.blue};
  text-align: center;
  margin-bottom: 10px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

export default GameJoin;
