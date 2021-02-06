import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";
import AnswerChoice from "components/Quiz/AnswerChoice";
import Loader from "components/Utils/Loader";
import { Answer } from "models/Game";
import ErrorHandler from "components/Error/ErrorHandler";
import useQuiz from "hooks/useQuiz";
import useGame from "hooks/useGame";

interface PlayerProps {
  shortId: string;
  playerId: string;
}

const Player: React.FC<PlayerProps> = ({ shortId, playerId }): JSX.Element => {
  const { game, gameError } = useGame({
    shortId,
    subscribe: { currentQuizItem: true },
  });

  const { quizItemData, quizLoading, quizError } = useQuiz({
    game,
    isHost: false,
  });

  const [selectedAnswer, setSelectedAnswer] = React.useState<Answer | null>(
    null,
  );

  React.useEffect(() => {
    if (
      quizItemData &&
      selectedAnswer &&
      quizItemData?.quizId !== selectedAnswer?.quizId
    ) {
      setSelectedAnswer(null);
    }
  }, [quizItemData]);

  if (gameError || quizError) {
    return <ErrorHandler gameError={gameError} quizError={quizError} />;
  }

  return !quizLoading && quizItemData ? (
    <PlayerContainer className="d-flex flex-column">
      <AnswerChoice
        color={EStyles.darkBlue}
        answer={quizItemData.quiz.choices[0]}
        shortId={shortId}
        quizId={game.currentQuizItem.quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.yellow}
        answer={quizItemData.quiz.choices[1]}
        shortId={shortId}
        quizId={game.currentQuizItem.quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.orange}
        answer={quizItemData.quiz.choices[2]}
        shortId={shortId}
        quizId={game.currentQuizItem.quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.turquoise}
        answer={quizItemData.quiz.choices[3]}
        shortId={shortId}
        quizId={game.currentQuizItem.quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
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
