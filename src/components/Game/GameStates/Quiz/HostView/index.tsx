import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";

import LMNLogo from "components/Utils/LMNLogo";
import FullContainer from "components/Utils/FullContainer";
import EStyles from "constants/Styling.constants";
import {
  GAME_CURRENT_QUIZ_ITEM_UPDATED,
  getGame,
  subscribeToPlayerAnswered,
  UPDATE_GAME_CURRENT_QUIZ_ITEM,
} from "services/games.service";
import FullScreenError from "components/Utils/FullScreenError";
import { ECookieName } from "constants/Cookies.constants";
import { QuizItem } from "models/Quiz";
import Loader from "components/Utils/Loader";
import { getQuiz, getLazyRandomQuizId } from "services/quizzes.service";
import { Player } from "models/Player";
import useUpdatedData from "hooks/useUpdatedData";
import { CurrentQuizItem } from "models/Game";
import Button from "components/Utils/Button";
import { Answer } from "models/Game";

interface HostViewProps {
  shortId: string;
}

const HostView: React.FC<HostViewProps> = ({ shortId }): JSX.Element => {
  const [playersAnswers, setPlayersAnswers] = React.useState<
    Record<string, Answer>
  >({});

  const { quizId, level, quizItemId } = useUpdatedData<CurrentQuizItem>({
    shortId,
    subscription: GAME_CURRENT_QUIZ_ITEM_UPDATED,
    subscriptionName: "gameCurrentQuizItemUpdated",
    cookieName: ECookieName.currentQuizItem,
  });

  const [updateGameCurrentQuizItem] = useMutation(
    UPDATE_GAME_CURRENT_QUIZ_ITEM,
  );

  const {
    triggerGetRandomQuiz,
    randomQuizIdData,
    randomQuizIdRefetch,
  } = getLazyRandomQuizId();

  const handleNewQuestion = async ({ quizId }: { quizId: string }) => {
    const currentQuizItem = {
      quizId: quizId,
      level: "intermediate",
      quizItemId: 2,
    };
    await updateGameCurrentQuizItem({
      variables: { shortId, currentQuizItem },
    });
    await quizRefetch();
  };

  React.useEffect(() => {
    if (randomQuizIdData) {
      handleNewQuestion({ quizId: randomQuizIdData.randomQuizId });
    }
  }, [randomQuizIdData]);

  const { gameLoading, gameError, gameData } = getGame({ shortId });
  const { quizRefetch, quizLoading, quizError, quizData } = getQuiz({ quizId });
  const answerData = subscribeToPlayerAnswered({ shortId });

  React.useEffect(() => {
    if (answerData) {
      const playerId = answerData.playerAnswered.playerId;
      if (playersAnswers[playerId]?.quizId !== quizId) {
        playersAnswers[playerId] = {
          quizId,
          answer: answerData.playerAnswered.answer,
        };
      }
      setPlayersAnswers({ ...playersAnswers });
    }
  }, [answerData]);

  const currentQuizItem = quizData?.quiz.quizItems[level].find(
    (quiz: QuizItem) => quiz._id === quizItemId,
  );

  console.log(playersAnswers);

  // console.log(
  //   `${
  //     gameData?.game.players.find(
  //       (player: Player) => player._id === answerData?.playerAnswered?.playerId,
  //     )?.name
  //   } a répondu ${answerData?.playerAnswered?.answer}`,
  // );

  if (gameError) {
    return <FullScreenError errorLabel="Erreur ! Partie non trouvée." />;
  }
  if (quizError) {
    return <FullScreenError errorLabel="Erreur ! Quiz non trouvé." />;
  }

  return !gameLoading && !quizLoading && gameData && quizData ? (
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
          <QuizContainer>{currentQuizItem.question}</QuizContainer>
          <FullWidthContainer className="d-flex justify-center">
            <AnswerContainer color={EStyles.darkBlue}>
              {currentQuizItem.choices[0]}
            </AnswerContainer>
            <AnswerContainer color={EStyles.yellow}>
              {currentQuizItem.choices[1]}
            </AnswerContainer>
          </FullWidthContainer>
          <FullWidthContainer className="d-flex justify-center">
            <AnswerContainer color={EStyles.orange}>
              {currentQuizItem.choices[2]}
            </AnswerContainer>
            <AnswerContainer color={EStyles.turquoise}>
              {currentQuizItem.choices[3]}
            </AnswerContainer>
          </FullWidthContainer>
        </FullWidthContainer>
        <div className="d-flex">
          {gameData.game.players.map((player: Player) => {
            let color;
            if (playersAnswers[player._id]) {
              if (
                playersAnswers[player._id].answer === currentQuizItem.answer
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
        <Button
          label="Nouvelle question"
          onClick={async () => {
            if (randomQuizIdRefetch) {
              await randomQuizIdRefetch();
            } else {
              triggerGetRandomQuiz();
            }
          }}
        />
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
