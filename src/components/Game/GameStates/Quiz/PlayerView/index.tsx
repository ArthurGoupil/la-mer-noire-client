import React from "react";
import styled from "styled-components";

import EStyles from "constants/Styling.constants";
import AnswerChoice from "./AnswerChoice";
import FullScreenError from "components/Utils/FullScreenError";
import { ECookieName } from "constants/Cookies.constants";
import { GAME_CURRENT_QUIZ_ITEM_UPDATED } from "services/games.service";
import { getQuiz } from "services/quizzes.service";
import { QuizItem } from "models/Quiz";
import Loader from "components/Utils/Loader";
import useUpdatedData from "hooks/useUpdatedData";
import { Answer } from "models/Game";

interface PlayerViewProps {
  shortId: string;
  playerId: string;
}

interface CurrentQuizItem {
  quizId: string;
  level: string;
  quizItemId: number;
}

const PlayerView: React.FC<PlayerViewProps> = ({
  shortId,
  playerId,
}): JSX.Element => {
  const [selectedAnswer, setSelectedAnswer] = React.useState<Answer | null>(
    null,
  );

  const { quizId, level, quizItemId } = useUpdatedData<CurrentQuizItem>({
    shortId,
    subscription: GAME_CURRENT_QUIZ_ITEM_UPDATED,
    subscriptionName: "gameCurrentQuizItemUpdated",
    cookieName: ECookieName.currentQuizItem,
  });

  const { quizLoading, quizError, quizData } = getQuiz({
    quizId: quizId,
  });

  const currentQuizItem = quizData?.quiz.quizItems[level].find(
    (quiz: QuizItem) => quiz._id === Number(quizItemId),
  );

  React.useEffect(() => {
    if (currentQuizItem?.quizId !== selectedAnswer?.quizId)
      setSelectedAnswer(null);
  }, [currentQuizItem]);

  if (quizError) {
    return <FullScreenError errorLabel="Erreur ! Quiz non trouvé." />;
  }

  return !quizLoading && quizData ? (
    <PlayerViewContainer className="d-flex flex-column">
      <AnswerChoice
        color={EStyles.darkBlue}
        answer={currentQuizItem.choices[0]}
        shortId={shortId}
        quizId={quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.yellow}
        answer={currentQuizItem.choices[1]}
        shortId={shortId}
        quizId={quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.orange}
        answer={currentQuizItem.choices[2]}
        shortId={shortId}
        quizId={quizId}
        playerId={playerId}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
      />
      <AnswerChoice
        color={EStyles.turquoise}
        answer={currentQuizItem.choices[3]}
        shortId={shortId}
        quizId={quizId}
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
