import React from "react";

import FullWidthContainer from "components/Utils/FullWidthContainer";
import CategoryTheme from "components/Quiz/Host/CategoryTheme";
import QuestionDisplay from "components/Quiz/Host/Question";
import { PlayerData } from "models/Game.model";
import isValidAnswer from "utils/quiz/isValidAnswer.util";
import TimeBar from "components/Quiz/Others/TimeBar";
import PlayerAnswer from "components/Quiz/Host/PlayerAnswer";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import Loader from "components/Utils/Loader";
import useQuizTiming from "hooks/quiz/useQuizTiming.hook";
import { HostCurrentContainerProps } from "components/Quiz/Host/HostCurrentContainer";

const CaPasseOuCaCash: React.FC<HostCurrentContainerProps> = ({
  game,
  quizItemData,
  playersAnswers,
}): JSX.Element => {
  const { remainingTime, questionIsOver } = useQuizTiming({
    players: game.players,
    playersAnswers,
    timestampReference: quizItemData.createdAtTimestamp,
    duration: 20,
  });

  return remainingTime ? (
    <FullWidthContainer className="d-flex flex-column align-center space-between flex-grow">
      <div className="d-flex flex-column align-center justify-center flex-grow">
        <QuestionDisplay quizItem={quizItemData.quiz} showAnswers={false} />
        <div className="d-flex">
          {game.players.map((playerData: PlayerData, index: number) => {
            return (
              <PlayerAnswer
                key={index}
                playerName={playerData.player.name}
                answerType={playersAnswers[playerData.player._id]?.answerType}
                isGoodAnswer={isValidAnswer({
                  answer: quizItemData.quiz.answer,
                  givenAnswer: playersAnswers[playerData.player._id]?.answer,
                })}
                noMarginRight={index === game.players.length - 1}
                questionIsOver={questionIsOver}
              />
            );
          })}
        </div>
      </div>
      <CategoryTheme
        categoryName={quizItemData.category.name}
        theme={quizItemData.theme}
        subTheme={quizItemData.subTheme}
      />
      <TimeBar
        totalTime={20}
        remainingTime={remainingTime}
        questionIsOver={questionIsOver}
        isHost
      />
    </FullWidthContainer>
  ) : (
    <FullHeightContainer className="d-flex justify-center align-center">
      <Loader />
    </FullHeightContainer>
  );
};

export default CaPasseOuCaCash;
