import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";
import { Game } from "models/Game";

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

  if (currentQuizItem) {
    return <QuizContainer>{currentQuizItem.question}</QuizContainer>;
  }

  return <QuizContainer>Erreur ! Le quiz n'a pas été trouvé.</QuizContainer>;
};

const QuizContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: ${EStyles.radius};
`;

export default Quiz;
