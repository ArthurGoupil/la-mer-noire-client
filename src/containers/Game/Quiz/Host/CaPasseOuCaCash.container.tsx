import React from "react";
import styled from "styled-components";

import FullWidthContainer from "components/Utils/FullWidthContainer";
import CategoryTheme from "components/Quiz/Host/CategoryTheme";
import { QuizItemData } from "models/Quiz.model";
import QuestionDisplay from "components/Quiz/Host/Question";
import { Answer, Game, PlayerData } from "models/Game.model";
import isValidAnswer from "utils/Quiz/isValidAnswer.util";
import TimeBar from "components/Quiz/Others/TimeBar";
import PlayerAnswer from "components/Quiz/Host/PlayerAnswer";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import Loader from "components/Utils/Loader";
import useQuizRemainingTime from "hooks/useQuizRemainingTime.util";

interface CaPasseOuCaCashProps {
  game: Game;
  quizItemData: QuizItemData;
  playersAnswers: Record<string, Answer>;
}

const CaPasseOuCaCash: React.FC<CaPasseOuCaCashProps> = ({
  game,
  quizItemData,
  playersAnswers,
}): JSX.Element => {
  const remainingTime = useQuizRemainingTime({
    timestampReference: quizItemData.createdAtTimestamp,
    duration: 20,
  });

  return remainingTime ? (
    <FullWidthContainer className="d-flex flex-column align-center space-between flex-grow">
      <div className="d-flex flex-column align-center justify-center flex-grow">
        <QuestionDisplay quizItem={quizItemData.quiz} showAnswers={false} />
        <PlayerAnswer />
        <div className="d-flex">
          {game.players.map((playerData: PlayerData) => {
            let color;
            if (playersAnswers[playerData.player._id]) {
              if (
                isValidAnswer({
                  answer: quizItemData.quiz.answer,
                  givenAnswer: playersAnswers[playerData.player._id].answer,
                })
              ) {
                color = "lime";
              } else {
                color = "red";
              }
            } else {
              color = "white";
            }
            return (
              <PlayerContainer key={playerData.player._id} color={color}>
                {playerData.player.name}
              </PlayerContainer>
            );
          })}
        </div>
      </div>
      <CategoryTheme
        categoryName={quizItemData.category.name}
        theme={quizItemData.theme}
        subTheme={quizItemData.subTheme}
      />
      <TimeBar totalTime={20} remainingTime={remainingTime} />
    </FullWidthContainer>
  ) : (
    <FullHeightContainer className="d-flex justify-center align-center">
      <Loader />
    </FullHeightContainer>
  );
};

const PlayerContainer = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  margin-right: 20px;
`;

export default CaPasseOuCaCash;
