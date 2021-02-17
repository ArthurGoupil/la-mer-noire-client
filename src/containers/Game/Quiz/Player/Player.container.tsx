import React from "react";

import { Game } from "models/Game.model";
import { FullScreenError } from "components/Utils/FullScreenError";
import { getCookie } from "utils/cookies.util";
import { ECookieName } from "constants/Cookies.constants";
import { FullHeightContainer } from "components/Utils/FullHeightContainer";
import { TimeBar } from "components/Quiz/Others/TimeBar";
import { useQuery } from "@apollo/client";
import { GET_QUIZ_ITEM_DATA } from "services/quizzes.service";
import { useQuizLifetime } from "hooks/quiz/useQuizLifetime.hook";
import { usePlayersAnswers } from "hooks/quiz/usePlayersAnswers.hook";
import { useDuoAnswersIndexes } from "hooks/quiz/useDuoAnswersIndexes.hook";
import { error, loading, ready } from "constants/NetworkStatuses.constants";
import { DuoCarreCashAnswerContainer } from "./DuoCarreCashAnswer.container";
import { EQuizStage } from "constants/GameStage.constants";
import { getGlobalNetworkStatus } from "utils/networkStatus.util";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";
import { EQuizDuration } from "constants/QuizDuration.constants";

interface PlayerProps {
  game: Game;
}

export const PlayerContainer: React.FC<PlayerProps> = ({
  game,
}): JSX.Element => {
  const { stage, shortId, currentQuizItem } = game;

  const { quizId, level, quizItemId, createdAtTimestamp } = currentQuizItem;

  const playerId = getCookie<string>({
    prefix: game.shortId,
    cookieName: ECookieName.playerId,
  });

  const {
    data: { quizItemData } = { quizItemData: null },
    networkStatus: quizItemDataNetworkStatus,
  } = useQuery(GET_QUIZ_ITEM_DATA, {
    variables: { quizId, level, quizItemId, createdAtTimestamp },
  });

  const { allPlayersHaveAnswered } = usePlayersAnswers({
    shortId,
    quizItemData,
    players: game.players,
  });

  const { duoAnswersIndexes } = useDuoAnswersIndexes({
    shortId: game.shortId,
    quizItemData,
  });

  const {
    remainingTime,
    doneQuestionsRecord,
    networkStatus: remainingTimeNetworkStatus,
  } = useQuizLifetime({
    shortId,
    quizId: quizItemData?.quizId,
    allPlayersHaveAnswered,
    timestampReference: quizItemData?.createdAtTimestamp,
    duration: EQuizDuration.caPasseOuCaCash,
  });

  const networkStatus = getGlobalNetworkStatus({
    networkStatuses: [quizItemDataNetworkStatus, remainingTimeNetworkStatus],
    booleanCondition: duoAnswersIndexes !== undefined,
  });

  return {
    [ready]: (
      <FullHeightContainer
        className="d-flex flex-column align-center"
        padding="10px 20px"
      >
        <TimeBar
          totalTime={EQuizDuration.caPasseOuCaCash}
          remainingTime={remainingTime}
          allPlayersHaveAnswered={allPlayersHaveAnswered}
        />
        {
          {
            caPasseOuCaCash: (
              <DuoCarreCashAnswerContainer
                shortId={shortId}
                quizItemData={quizItemData}
                playerId={playerId}
                duoAnswersIndexes={duoAnswersIndexes}
                questionIsOver={doneQuestionsRecord[quizItemData?.quizId]}
              />
            ),
          }[(stage as unknown) as EQuizStage]
        }
      </FullHeightContainer>
    ),
    [loading]: <FullHeightLoader />,
    [error]: (
      <FullScreenError
        errorLabel="Erreur lors du chargement du quiz."
        link="/"
        linkLabel="Retourner au menu principal"
      />
    ),
  }[networkStatus];
};
