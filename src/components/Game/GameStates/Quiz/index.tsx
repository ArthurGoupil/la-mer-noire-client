import React from "react";
import Cookies from "js-cookie";
import styled from "styled-components";

import { Game } from "models/Game";
import FullContainer from "components/Utils/FullContainer";
import PlayerView from "./PlayerView";
import HostView from "./HostView";

interface QuizProps {
  shortId: string;
  userType: string;
  gameData: {
    getGame: Game;
  };
}

const Quiz: React.FC<QuizProps> = ({
  shortId,
  userType,
  gameData,
}): JSX.Element => {
  const { quiz, level, itemId } = gameData.getGame.currentState.question;
  const currentQuizItem = quiz.quizItems[level].find(
    (quiz) => quiz._id === Number(itemId),
  );
  const playerId = Cookies.get(shortId);

  if (currentQuizItem) {
    if (userType === "play") {
      if (playerId) {
        return (
          <PlayerView
            shortId={shortId}
            playerId={playerId}
            currentQuizItem={currentQuizItem}
          />
        );
      } else {
        <FullContainer>
          <ErrorWrapper>
            Erreur ! Vous n'avez pas pu être identifié par vos cookies.
            Assurez-vous de ne pas être en navigation privée.
          </ErrorWrapper>
        </FullContainer>;
      }
    }

    if (userType === "host") {
      return (
        <HostView
          shortId={shortId}
          currentQuizItem={currentQuizItem}
          currentPlayers={gameData.getGame.currentState.playersTurn}
        />
      );
    }
  }

  return (
    <FullContainer>
      <ErrorWrapper>Erreur ! Quiz non trouvé.</ErrorWrapper>
    </FullContainer>
  );
};

const ErrorWrapper = styled.span`
  color: white;
`;

export default Quiz;
