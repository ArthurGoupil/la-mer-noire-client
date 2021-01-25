import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";

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
  const { loading: quizLoading, error: quizError, data: quizData } = useQuery(
    GET_RANDOM_QUIZ,
  );

  const handleSubmit = async (name: string) => {
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
      const handleLaunchQuestion = async () => {
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
      };
      handleLaunchQuestion();
    }

    return () => clearTimeout(timeout);
  }, [launchCounter]);

  return (
    <FullContainer className="d-flex flex-column align-center space-around">
      <LMNLogo width="400px" margin={`20px 0 20px 0`} />
      <GameName>{gameData.getGame.name.toUpperCase()}</GameName>
      <div className="d-flex flex-column align-center">
        <GameCodeBloc gameCode={gameData.getGame.shortId} />
        {userType === "join" && (
          <InputAndButton
            handleSubmit={handleSubmit}
            buttonLabel="Rejoindre la partie"
            placeholder="My lovely name"
            margin={`0 0 20px 0`}
          />
        )}
        <ItemsList
          list={gameData.getGame.players}
          labelKey="name"
          className="d-flex justify-center flex-wrap"
          maxWidth="600px"
          margin={`0 0 40px 0`}
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
          color={EStyles.darkBlue}
          backgroundColor={EStyles.turquoise}
          hoverColor={EStyles.darken_turquoise}
        />
      )}
    </FullContainer>
  );
};

const GameName = styled.h1`
  color: ${EStyles.yellow};
  text-shadow: 3px 3px 0 ${EStyles.redOrange};
  margin-bottom: 40px;
  text-align: center;
`;

export default GameJoin;
