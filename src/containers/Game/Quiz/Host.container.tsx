import React from "react";
import { useQuery, useSubscription } from "@apollo/client";
import styled from "styled-components";

import { GET_GAME, PLAYER_ANSWERED } from "services/games.service";
import Loader from "components/Utils/Loader";
import { Answer } from "models/Game";
import { setCookie } from "utils/cookies.utils";
import ECookieName from "constants/Cookies.constants";
import useCookie from "hooks/useCookie";
import useQuiz from "hooks/useQuiz";
import FullContainer from "components/Utils/FullContainer";
import LMNLogo from "components/Utils/LMNLogo";
import EStyles from "constants/Styling.constants";
import { Player } from "models/Player";
import Button from "components/Utils/Button";
import ErrorHandler from "components/Error/ErrorHandler";

interface HostProps {
  shortId: string;
}

const Host: React.FC<HostProps> = ({ shortId }): JSX.Element => {
  const { data: { game } = {}, error: gameError } = useQuery(GET_GAME, {
    variables: { shortId },
  });

  const { quizItemData, quizLoading, quizError, generateNewQuestion } = useQuiz(
    {
      game,
      isHost: true,
      resetAnswers: () => setPlayersAnswers({}),
    },
  );

  const { data: answerData } = useSubscription(PLAYER_ANSWERED, {
    variables: { shortId },
  });

  const [playersAnswers, setPlayersAnswers] = React.useState<
    Record<string, Answer>
  >(
    useCookie({ prefix: shortId, cookieName: ECookieName.playersAnswers }) ||
      {},
  );

  React.useEffect(() => {
    if (answerData && quizItemData) {
      const playerId = answerData.playerAnswered.playerId;
      if (playersAnswers[playerId]?.quizId !== quizItemData.quizId) {
        playersAnswers[playerId] = {
          quizId: quizItemData.quizId,
          answer: answerData.playerAnswered.answer,
        };
      }
      setPlayersAnswers({ ...playersAnswers });
      setCookie({
        prefix: shortId,
        cookieName: ECookieName.playersAnswers,
        cookieValue: playersAnswers,
      });
    }
  }, [answerData]);

  if (gameError || quizError) {
    return <ErrorHandler gameError={gameError} quizError={quizError} />;
  }

  return game && !quizLoading && quizItemData ? (
    <FullContainer className="d-flex flex-column align-center">
      <LMNLogo width="400px" margin={`20px 0 20px 0`} />
      <FullWidthContainer className="d-flex flex-column align-center space-between flex-grow">
        <div className="d-flex">
          <CategoryContainer>{quizItemData.category.name}</CategoryContainer>
          <ThemeContainer className="d-flex">
            {quizItemData.theme}
            <SubThemeContainer>{quizItemData.subTheme}</SubThemeContainer>
          </ThemeContainer>
        </div>
        <FullWidthContainer className="d-flex flex-column align-center">
          <QuizContainer>{quizItemData.quiz.question}</QuizContainer>
          <FullWidthContainer className="d-flex justify-center">
            <AnswerContainer color={EStyles.darkBlue}>
              {quizItemData.quiz.choices[0]}
            </AnswerContainer>
            <AnswerContainer color={EStyles.yellow}>
              {quizItemData.quiz.choices[1]}
            </AnswerContainer>
          </FullWidthContainer>
          <FullWidthContainer className="d-flex justify-center">
            <AnswerContainer color={EStyles.orange}>
              {quizItemData.quiz.choices[2]}
            </AnswerContainer>
            <AnswerContainer color={EStyles.turquoise}>
              {quizItemData.quiz.choices[3]}
            </AnswerContainer>
          </FullWidthContainer>
        </FullWidthContainer>
        <div className="d-flex">
          {game.players.map((player: Player) => {
            let color;
            if (playersAnswers[player._id]) {
              if (
                playersAnswers[player._id].answer === quizItemData.quiz.answer
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
        <Button label="Nouvelle question" onClick={generateNewQuestion} />
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

export default Host;
