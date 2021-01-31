import React from "react";
import styled from "styled-components";

import LMNLogo from "components/Utils/LMNLogo";
import FullContainer from "components/Utils/FullContainer";
import EStyles from "constants/Styling.constants";
import {
  GAME_CURRENT_QUIZ_ITEM_UPDATED,
  getGame,
  subscribeToPlayerAnswered,
} from "services/games.service";
import FullScreenError from "components/Utils/FullScreenError";
import { ECookieName } from "constants/Cookies.constants";
import { QuizItem } from "models/Quiz";
import Loader from "components/Utils/Loader";
import useGameCookie from "hooks/useGameCookies";
import { getQuiz } from "services/quizzes.service";
import { Player } from "models/Player";
import useUpdatedData from "hooks/useUpdatedData";
import { CurrentQuizItem } from "models/Game";

interface HostViewProps {
  shortId: string;
}

const HostView: React.FC<HostViewProps> = ({ shortId }): JSX.Element => {
  const { quizId, level, quizItemId } = useUpdatedData<CurrentQuizItem>({
    shortId,
    subscription: GAME_CURRENT_QUIZ_ITEM_UPDATED,
    subscriptionName: "gameCurrentQuizItemUpdated",
    cookieName: ECookieName.currentQuizItem,
  });

  const { gameLoading, gameError, gameData } = getGame({ shortId });
  const { quizLoading, quizError, quizData } = getQuiz({ quizId });
  const answerData = subscribeToPlayerAnswered({ shortId });

  const currentQuizItem = quizData?.quiz.quizItems[level].find(
    (quiz: QuizItem) => quiz._id === quizItemId,
  );

  console.log(
    `${
      gameData?.game.players.find(
        (player: Player) => player._id === answerData?.playerAnswered?.playerId,
      )?.name
    } a répondu ${answerData?.playerAnswered?.answer}`,
  );

  if (gameError) {
    return <FullScreenError errorLabel="Erreur ! Partie non trouvée." />;
  }
  if (quizError) {
    return <FullScreenError errorLabel="Erreur ! Quiz non trouvé." />;
  }

  return !gameLoading && !quizLoading && gameData && quizData ? (
    <FullContainer className="d-flex flex-column align-center">
      <LMNLogo width="400px" margin={`20px 0 20px 0`} />
      <CategoryThemeContainer>
        {quizData.quiz.category.name}
        <br />
        {quizData.quiz.theme}
        <br />
        {quizData.quiz.subTheme}
      </CategoryThemeContainer>
      <QuizContainer>{currentQuizItem.question}</QuizContainer>
    </FullContainer>
  ) : (
    <Loader containerHeight="100vh" />
  );
};

const CategoryThemeContainer = styled.div`
  background-color: ${EStyles.redOrange};
  color: white;
  padding: 10px;
  border-radius: ${EStyles.radius};
  text-align: center;
`;

const QuizContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: ${EStyles.radius};
`;

export default HostView;
