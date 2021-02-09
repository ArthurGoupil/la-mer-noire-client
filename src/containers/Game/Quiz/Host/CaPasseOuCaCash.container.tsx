import React from "react";
import styled from "styled-components";

import FullWidthContainer from "components/Utils/FullWidthContainer";
import CategoryTheme from "components/Quiz/Host/CategoryTheme";
import { QuizItemData } from "models/Quiz";
import QuestionDisplay from "components/Quiz/Host/Question";
import { Answer, Game, PlayerData } from "models/Game";
import { GenerateNewQuizItemDataProps } from "./Host.container";
import isValidAnswer from "utils/Quiz/isValidAnswer.utils";
import TimeBar from "components/Quiz/Others/TimeBar";
import useRemainingTime from "hooks/useRemainingTime";

interface CaPasseOuCaCashProps {
  game: Game;
  quizItemData: QuizItemData;
  playersAnswers: Record<string, Answer>;
  handleGenerateNewQuizItemData: ({
    quizItemLevel,
    quizItemId,
  }: GenerateNewQuizItemDataProps) => void;
}

const CaPasseOuCaCash: React.FC<CaPasseOuCaCashProps> = ({
  game,
  quizItemData,
  playersAnswers,
}): JSX.Element => {
  const remainingTime = useRemainingTime({
    timestampReference: quizItemData?.createdAtTimestamp,
    duration: 20,
  });

  return (
    <FullWidthContainer className="d-flex flex-column space-between flex-grow">
      <div className="d-flex flex-column align-center space-around flex-grow">
        <div className="d-flex flex-column align-center">
          <CategoryTheme
            categoryName={quizItemData.category.name}
            theme={quizItemData.theme}
            subTheme={quizItemData.subTheme}
          />
          <QuestionDisplay quizItem={quizItemData.quiz} showAnswers={false} />
        </div>
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
      <TimeBar totalTime={20} remainingTime={remainingTime} />
    </FullWidthContainer>
  );
};

const PlayerContainer = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  margin-right: 20px;
`;

export default CaPasseOuCaCash;
