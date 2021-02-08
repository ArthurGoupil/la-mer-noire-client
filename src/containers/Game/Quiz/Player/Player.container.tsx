import React from "react";
import styled from "styled-components";

import Loader from "components/Utils/Loader";
import { Answer, Game } from "models/Game";
import useQuiz from "hooks/useQuiz";
import FullScreenError from "components/Error/FullScreenError";
// import CarreAnswers from "components/Quiz/Player/CarreAnswers";
// import DuoAnswers from "components/Quiz/Player/DuoAnswers";
import getRandomDuoAnswersIndexes from "utils/Quiz/getRandomDuoAnswersIndexes";
import { setCookie } from "utils/cookies.utils";
import ECookieName from "constants/Cookies.constants";
import useCookie from "hooks/useCookie";
import { DuoAnswersIndexes } from "models/Quiz";
import CashAnswer from "components/Quiz/Player/CashAnswer";

interface PlayerProps {
  game: Game;
  playerId: string;
}

const Player: React.FC<PlayerProps> = ({ game, playerId }): JSX.Element => {
  const { quizItemData, quizLoading, quizError } = useQuiz({
    game,
    isHost: false,
  });
  const [
    duoAnswersIndexes,
    setDuoAnswersIndexes,
  ] = React.useState<DuoAnswersIndexes>(
    useCookie({
      prefix: game.shortId,
      cookieName: ECookieName.duoAnswersIndexes,
    }),
  );

  const [selectedAnswer, setSelectedAnswer] = React.useState<Answer | null>(
    null,
  );

  React.useEffect(() => {
    if (quizItemData) {
      if (selectedAnswer && selectedAnswer?.quizId !== quizItemData.quizId) {
        setSelectedAnswer(null);
      }
      if (duoAnswersIndexes?.quizId !== quizItemData.quizId) {
        const duoAnswersIndexesToStore = {
          quizId: quizItemData.quizId,
          indexes: getRandomDuoAnswersIndexes({
            choices: quizItemData.quiz.choices,
            answer: quizItemData.quiz.answer,
          }),
        };
        setDuoAnswersIndexes(duoAnswersIndexesToStore);
        setCookie({
          prefix: game.shortId,
          cookieName: ECookieName.duoAnswersIndexes,
          cookieValue: duoAnswersIndexesToStore,
        });
      }
    }
  }, [quizItemData]);

  if (quizError) {
    return (
      <FullScreenError
        errorLabel="Erreur ! Quiz non trouvé."
        link="/"
        linkLabel="Retourner au menu principal"
      />
    );
  }

  return !quizLoading && quizItemData && duoAnswersIndexes ? (
    <PlayerContainer className="d-flex flex-column">
      {/* <CarreAnswers
        shortId={game.shortId}
        quizId={quizItemData.quizId}
        choices={quizItemData.quiz.choices}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      /> */}
      {/* <DuoAnswers
        shortId={game.shortId}
        quizId={quizItemData.quizId}
        choices={duoAnswersIndexes.indexes.map(
          (answerIndex) => quizItemData.quiz.choices[answerIndex],
        )}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      /> */}
      <CashAnswer
        shortId={game.shortId}
        quizId={quizItemData.quizId}
        playerId={playerId}
        answer={quizItemData.quiz.answer}
        setSelectedAnswer={setSelectedAnswer}
      />
    </PlayerContainer>
  ) : (
    <Loader containerHeight="100vh" />
  );
};

const PlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 10px;
`;

export default Player;
