import React from "react";

import { CarreAnswers } from "components/Quiz/Player/CarreAnswers";
import { CookieName } from "constants/Cookies.constants";
import { Game } from "models/Game.model";
import { getCookie, setCookie } from "utils/cookies.util";
import { useCurrentAnswer } from "hooks/quiz/useCurrentAnswer.hook";
import { QuizItemData } from "models/Quiz.model";
import styled from "styled-components";
import { Styles } from "constants/Styling.constants";
import { getQuizLevelGradient } from "utils/quiz/getQuizLevelGradient.util";
import { FullHeightWithWaves } from "components/Quiz/Host/FullHeightWithWaves";
import { useRacePlayersAnswers } from "hooks/quiz/useRacePlayersAnswer.hook";
import { Trophy } from "components/Quiz/Host/Trophy";
import { LMNLogo } from "components/Utils/LMNLogo";

interface ScubadoobidooAnswerContainerProps {
  game: Game;
  playerId: string;
  quizzesItemsData: QuizItemData[];
}

export const ScubadoobidooAnswerContainer: React.FC<ScubadoobidooAnswerContainerProps> = ({
  game,
  playerId,
  quizzesItemsData,
}): JSX.Element => {
  const [currentQuizIndex, setCurrentQuizIndex] = React.useState<number>(
    getCookie({ prefix: game.shortId, cookieName: CookieName.scubaCurrentIndex }) || 0,
  );
  const [isOver, setIsOver] = React.useState<boolean>(false);

  const { racePlayersAnswers, playersRanking } = useRacePlayersAnswers({
    shortId: game.shortId,
    players: game.players,
  });

  const { currentAnswer, setCurrentAnswer } = useCurrentAnswer({
    shortId: game.shortId,
    quizItemSignature: quizzesItemsData[currentQuizIndex].quizItemSignature,
    answerCallback: () => {
      if (currentQuizIndex < 29) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        setCookie({
          prefix: game.shortId,
          cookieName: CookieName.scubaCurrentIndex,
          cookieValue: currentQuizIndex + 1,
        });
      } else {
        setIsOver(true);
      }
    },
  });

  React.useEffect(() => {
    if (racePlayersAnswers[playerId].answersFactor === 10) {
      setIsOver(true);
    }
  }, [playerId, racePlayersAnswers]);

  const currentQuizItemData = quizzesItemsData[currentQuizIndex];
  const backgroundGradient = getQuizLevelGradient({
    quizLevel: currentQuizItemData.level,
  });

  if (isOver || !game.currentQuizItem.playersCanAnswer) {
    const ranking = playersRanking.indexOf(playerId) + 1;
    return (
      <FullHeightWithWaves>
        {ranking === 1 && (
          <>
            <Trophy src="/icons/trophy.svg" width="70%" />
            <EndLabel>WINNER !</EndLabel>
          </>
        )}
        {ranking === 2 && (
          <>
            <Trophy src="/icons/silver.svg" width="70%" />
            <EndLabel>DEUXIÈME !</EndLabel>
          </>
        )}
        {ranking === 3 && (
          <>
            <Trophy src="/icons/BRONZE.svg" width="70%" />
            <EndLabel>TROISIÈME !</EndLabel>
          </>
        )}
        {!ranking ||
          (ranking > 3 && (
            <FullHeightWithWaves>
              <LMNLogo width="100%" />
            </FullHeightWithWaves>
          ))}
      </FullHeightWithWaves>
    );
  }

  return (
    <>
      <EnergyContainer className="d-flex align-center">
        <FlashIcon src="/icons/flash.svg" />
        <EnergyBar
          className="d-flex justify-center align-center"
          background={`linear-gradient(to bottom, ${backgroundGradient[0]} 20%, ${backgroundGradient[1]} 100%);`}
        >
          {30 - currentQuizIndex}/30
        </EnergyBar>
      </EnergyContainer>
      <div style={{ padding: 20, textAlign: "center" }}>{currentQuizItemData.quiz.question}</div>
      <CarreAnswers
        quizItemSignature={currentQuizItemData.quizItemSignature}
        choices={currentQuizItemData.quiz.choices}
        playerId={playerId}
        currentAnswer={currentAnswer}
        onClick={setCurrentAnswer}
        playerCanAnswer={true}
        correctAnswer={currentQuizItemData.quiz.answer}
      />
    </>
  );
};

const EnergyContainer = styled.div`
  width: 100%;
  height: 70px;
  padding: 10px;
  background-color: ${Styles.darkBlue};
  border-radius: 5px;
  margin-top: 10px;
`;

const FlashIcon = styled.img`
  height: 40px;
  margin: 0 10px;
`;

const EnergyBar = styled.div<{ background: string }>`
  width: 100%;
  height: 100%;
  background: ${(props) => props.background};
  border-radius: 5px;
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  text-shadow: 2px 2px 0 ${Styles.darkBlue};
`;

const EndLabel = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 50px;
  text-shadow: 3px 3px 0 ${Styles.redOrange};
  margin-top: 40px;
`;
