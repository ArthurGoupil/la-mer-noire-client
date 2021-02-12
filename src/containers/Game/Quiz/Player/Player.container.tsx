import React from "react";

import Loader from "components/Utils/Loader";
import { Answer, AnswerTypeChoice, Game } from "models/Game.model";
import FullScreenError from "components/Utils/FullScreenError";
import getRandomDuoAnswersIndexes from "utils/Quiz/getRandomDuoAnswersIndexes.util";
import { setCookie, getCookie } from "utils/cookies.util";
import ECookieName from "constants/Cookies.constants";
import { DuoAnswersIndexes } from "models/Quiz.model";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import TimeBar from "components/Quiz/Others/TimeBar";
import { useQuery } from "@apollo/client";
import { GET_QUIZ_ITEM_DATA } from "services/quizzes.service";
import useQuizRemainingTime from "hooks/useQuizTiming.util";
import AnswerTypeSelection from "components/Quiz/Player/AnswerTypeSelection";
import AnswerComponents from "../../../../components/Quiz/Player/AnswerComponents";
import useGetAnswers from "hooks/useGetAnswer.hook";

interface PlayerProps {
  game: Game;
  playerId: string;
}

const Player: React.FC<PlayerProps> = ({ game, playerId }): JSX.Element => {
  const { shortId, currentQuizItem } = game;
  const { quizId, level, quizItemId, createdAtTimestamp } = currentQuizItem;

  const {
    data: { quizItemData } = { quizItemData: null },
    loading: quizItemDataLoading,
    error: quizItemDataError,
  } = useQuery(GET_QUIZ_ITEM_DATA, {
    variables: { quizId, level, quizItemId, createdAtTimestamp },
  });

  const playersAnswers = useGetAnswers({
    shortId,
    quizItemData,
    players: game.players,
  });

  const [
    duoAnswersIndexes,
    setDuoAnswersIndexes,
  ] = React.useState<DuoAnswersIndexes>(
    getCookie({
      prefix: shortId,
      cookieName: ECookieName.duoAnswersIndexes,
    }),
  );
  const { remainingTime, questionIsOver } = useQuizRemainingTime({
    players: game.players,
    playersAnswers,
    timestampReference: quizItemData?.createdAtTimestamp,
    duration: 20,
  });

  const [
    answerTypeChoice,
    setAnswerTypeChoice,
  ] = React.useState<AnswerTypeChoice>(
    getCookie({ prefix: shortId, cookieName: ECookieName.answerTypeChoice }),
  );

  React.useEffect(() => {
    setCookie({
      prefix: shortId,
      cookieName: ECookieName.answerTypeChoice,
      cookieValue: answerTypeChoice,
    });
  }, [answerTypeChoice]);

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
          prefix: shortId,
          cookieName: ECookieName.duoAnswersIndexes,
          cookieValue: duoAnswersIndexesToStore,
        });
      }
    }
  }, [quizItemData]);

  if (quizItemDataError) {
    return (
      <FullScreenError
        errorLabel="Erreur ! Quiz non trouvé."
        link="/"
        linkLabel="Retourner au menu principal"
      />
    );
  }

  return !quizItemDataLoading && quizItemData && duoAnswersIndexes ? (
    <FullHeightContainer
      className="d-flex flex-column align-center"
      padding="10px 20px"
    >
      <TimeBar
        totalTime={20}
        remainingTime={remainingTime}
        questionIsOver={questionIsOver}
      />
      {answerTypeChoice?.quizId !== quizId ? (
        <AnswerTypeSelection
          quizId={quizId}
          questionIsOver={questionIsOver}
          setAnswerTypeChoice={setAnswerTypeChoice}
        />
      ) : (
        <AnswerComponents
          shortId={shortId}
          playerId={playerId}
          answerType={answerTypeChoice.answerType}
          quizItemData={quizItemData}
          duoAnswersIndexes={duoAnswersIndexes}
          questionIsOver={questionIsOver}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
      )}
    </FullHeightContainer>
  ) : (
    <FullHeightContainer className="d-flex justify-center align-center">
      <Loader />
    </FullHeightContainer>
  );
};

export default Player;
