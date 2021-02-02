import React from "react";
import styled from "styled-components";

import LMNLogo from "components/Utils/LMNLogo";
import FullContainer from "components/Utils/FullContainer";
import EStyles from "constants/Styling.constants";
import {
  getGame,
  subscribeToPlayerAnswered,
  UPDATE_GAME_CURRENT_QUIZ_ITEM,
} from "services/games.service";
import FullScreenError from "components/Utils/FullScreenError";
import { QuizItem } from "models/Quiz";
import Loader from "components/Utils/Loader";
import { Player } from "models/Player";
import Button from "components/Utils/Button";
import { Answer, CurrentQuizItem } from "models/Game";
import { ECookieName } from "constants/Cookies.constants";
import { getLazyQuiz, getLazyRandomQuizId } from "services/quizzes.service";
import useCookie from "hooks/useCookie";
import { globalUpdateCurrentQuizItem } from "utils/game.utils";
import { useMutation } from "@apollo/client";

interface HostViewProps {
  shortId: string;
}

const HostView: React.FC<HostViewProps> = ({ shortId }): JSX.Element => {
  const { gameLoading, gameError, gameData } = getGame({ shortId });
  const [updateGameCurrentQuizItem] = useMutation(
    UPDATE_GAME_CURRENT_QUIZ_ITEM,
  );
  const answerData = subscribeToPlayerAnswered({ shortId });
  const currentQuizItem = useCookie<CurrentQuizItem>({
    prefix: shortId,
    cookieName: ECookieName.currentQuizItem,
  });
  const {
    triggerGetRandomQuizId,
    randomQuizIdData,
    randomQuizIdRefetch,
  } = getLazyRandomQuizId();
  const { triggerGetQuiz, quizData, quizRefetch } = getLazyQuiz({
    quizId: currentQuizItem?.quizId || randomQuizIdData?.randomQuizId,
  });

  React.useEffect(() => {
    if (!currentQuizItem) {
      triggerGetRandomQuizId();
    } else {
      triggerGetQuiz();
    }
  }, []);

  React.useEffect(() => {
    if (randomQuizIdData) {
      (async () =>
        await globalUpdateCurrentQuizItem({
          shortId,
          currentQuizItem: {
            quizId: randomQuizIdData.randomQuizId,
            level: "beginner",
            quizItemId: 7,
          },
          updateMutation: updateGameCurrentQuizItem,
        }))();
      if (quizRefetch) {
        setPlayersAnswers({});
        quizRefetch();
      } else {
        triggerGetQuiz();
      }
    }
  }, [randomQuizIdData]);

  const handleGenerateNewQuestion = async (): Promise<void> => {
    if (randomQuizIdRefetch) {
      await randomQuizIdRefetch();
    } else {
      triggerGetRandomQuizId();
    }
  };

  const currentQuizItemData = quizData?.quiz.quizItems[
    currentQuizItem.level
  ].find((quiz: QuizItem) => quiz._id === currentQuizItem.quizItemId);

  const [playersAnswers, setPlayersAnswers] = React.useState<
    Record<string, Answer>
  >({});

  React.useEffect(() => {
    if (answerData && quizData) {
      const playerId = answerData.playerAnswered.playerId;
      if (playersAnswers[playerId]?.quizId !== quizData.quiz._id) {
        playersAnswers[playerId] = {
          quizId: quizData.quiz._id,
          answer: answerData.playerAnswered.answer,
        };
      }
      setPlayersAnswers({ ...playersAnswers });
    }
  }, [answerData]);

  if (gameError) {
    return <FullScreenError errorLabel="Erreur ! Partie non trouvée." />;
  }

  return !gameLoading && gameData && currentQuizItemData ? (
    <FullContainer className="d-flex flex-column align-center">
      <LMNLogo width="400px" margin={`20px 0 20px 0`} />
      <FullWidthContainer className="d-flex flex-column align-center space-between flex-grow">
        <div className="d-flex">
          <CategoryContainer>{quizData.quiz.category.name}</CategoryContainer>
          <ThemeContainer className="d-flex">
            {quizData.quiz.theme}
            <SubThemeContainer>{quizData.quiz.subTheme}</SubThemeContainer>
          </ThemeContainer>
        </div>
        <FullWidthContainer className="d-flex flex-column align-center">
          <QuizContainer>{currentQuizItemData.question}</QuizContainer>
          <FullWidthContainer className="d-flex justify-center">
            <AnswerContainer color={EStyles.darkBlue}>
              {currentQuizItemData.choices[0]}
            </AnswerContainer>
            <AnswerContainer color={EStyles.yellow}>
              {currentQuizItemData.choices[1]}
            </AnswerContainer>
          </FullWidthContainer>
          <FullWidthContainer className="d-flex justify-center">
            <AnswerContainer color={EStyles.orange}>
              {currentQuizItemData.choices[2]}
            </AnswerContainer>
            <AnswerContainer color={EStyles.turquoise}>
              {currentQuizItemData.choices[3]}
            </AnswerContainer>
          </FullWidthContainer>
        </FullWidthContainer>
        <div className="d-flex">
          {gameData.game.players.map((player: Player) => {
            let color;
            if (playersAnswers[player._id]) {
              if (
                playersAnswers[player._id].answer === currentQuizItemData.answer
              ) {
                color = "lime";
              } else {
                color = "red";
              }
            } else {
              color = "white";
            }
            return (
              <PlayerContainer key={player._id} color={color}>
                {player.name}
              </PlayerContainer>
            );
          })}
        </div>
        <Button label="Nouvelle question" onClick={handleGenerateNewQuestion} />
      </FullWidthContainer>
    </FullContainer>
  ) : (
    <Loader containerHeight="100vh" />
  );
};

const FullWidthContainer = styled.div`
  width: 100%;
`;

const CategoryContainer = styled.div`
  background-color: ${EStyles.red};
  color: white;
  text-align: center;
  font-weight: bold;
  padding: 15px;
  border-radius: 100px;
`;
const ThemeContainer = styled.div`
  background-color: ${EStyles.redOrange};
  color: white;
  text-align: center;
  padding: 15px;
  border-radius: 100px;
  margin-left: 10px;
`;
const SubThemeContainer = styled.div`
  font-style: italic;
  text-align: center;
  font-weight: lighter;
  margin-left: 10px;
`;

const QuizContainer = styled.div`
  color: white;
  font-size: 25px;
  line-height: 35px;
  padding: 10px;
  border-radius: ${EStyles.radius};
  text-align: center;
`;
const AnswerContainer = styled.div<{ color: string }>`
  color: white;
  min-width: 30%;
  text-align: center;
  font-weight: bold;
  padding: 20px;
  margin: 10px;
  border-radius: ${EStyles.miniRadius};
  background-color: ${(props) => props.color};
  text-shadow: 2px 2px 0px ${EStyles.darkBlue};
`;

const PlayerContainer = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  margin-right: 20px;
`;

export default HostView;
