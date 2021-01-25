import React from "react";
import Cookies from "js-cookie";

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
    if (userType === "play" && playerId) {
      return <PlayerView currentQuizItem={currentQuizItem} />;
    }

    if (userType === "host") {
      return <HostView currentQuizItem={currentQuizItem} />;
    }
  }

  return <FullContainer>Erreur ! Quiz non trouvé.</FullContainer>;
};

export default Quiz;
