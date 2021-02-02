import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";
import AnswerChoice from "./AnswerChoice";
import { getLazyQuiz } from "services/quizzes.service";
import { QuizItem } from "models/Quiz";
import Loader from "components/Utils/Loader";
import { Answer } from "models/Game";
import useUpdatedCurrentQuizItem from "hooks/useUpdatedCurrentQuizItem";

interface PlayerViewProps {
  shortId: string;
  playerId: string;
}

const PlayerView: React.FC<PlayerViewProps> = ({
  shortId,
  playerId,
}): JSX.Element => {
  const currentQuizItem = useUpdatedCurrentQuizItem({ shortId });
  const { triggerGetQuiz, quizData } = getLazyQuiz({
    quizId: currentQuizItem?.quizId,
  });

  const currentQuizItemData = quizData?.quiz.quizItems[
    currentQuizItem.level
  ].find((quiz: QuizItem) => quiz._id === currentQuizItem.quizItemId);

  React.useEffect(() => {
    if (currentQuizItem) {
      console.log("yo");

      triggerGetQuiz();
    }
  }, [currentQuizItem]);

  const [selectedAnswer, setSelectedAnswer] = React.useState<Answer | null>(
    null,
  );

  React.useEffect(() => {
    if (currentQuizItem?.quizId !== selectedAnswer?.quizId)
      setSelectedAnswer(null);
  }, [currentQuizItem]);

  return currentQuizItemData ? (
    <PlayerViewContainer className="d-flex flex-column">
      <AnswerChoice
        color={EStyles.darkBlue}
        answer={currentQuizItemData.choices[0]}
        shortId={shortId}
        quizId={currentQuizItem.quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.yellow}
        answer={currentQuizItemData.choices[1]}
        shortId={shortId}
        quizId={currentQuizItem.quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.orange}
        answer={currentQuizItemData.choices[2]}
        shortId={shortId}
        quizId={currentQuizItem.quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.turquoise}
        answer={currentQuizItemData.choices[3]}
        shortId={shortId}
        quizId={currentQuizItem.quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
    </PlayerViewContainer>
  ) : (
    <Loader containerHeight="100vh" />
  );
};

const PlayerViewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 10px;
`;

export default PlayerView;
