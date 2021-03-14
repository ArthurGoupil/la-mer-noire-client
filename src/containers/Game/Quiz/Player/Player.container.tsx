import React from "react";

import { Game } from "models/Game.model";
import { FullScreenError } from "components/Utils/FullScreenError";
import { getCookie } from "utils/cookies.util";
import { CookieName } from "constants/Cookies.constants";
import { FullHeightLayout } from "components/Utils/FullHeightLayout";
import { useQuery } from "@apollo/client";
import { GET_QUIZ_ITEM_DATA } from "services/quizzes.service";
import { DuoCarreCashAnswerContainer } from "./DuoCarreCashAnswer.container";
import { QuizStage } from "constants/GameStage.constants";
import { getGlobalNetworkStatus } from "utils/networkStatus.util";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";
import { useDuoAnswersIndexes } from "hooks/quiz/useDuoAnswersIndexes.hook";

interface PlayerProps {
  game: Game;
}

export const PlayerContainer: React.FC<PlayerProps> = ({ game }): JSX.Element => {
  const { stage, currentQuizItem } = game;
  const { quizId, level, quizItemId } = currentQuizItem;

  const playerId = getCookie<string>({
    prefix: game.shortId,
    cookieName: CookieName.playerId,
  });

  const {
    data: { quizItemData } = { quizItemData: null },
    networkStatus: quizItemDataNetworkStatus,
  } = useQuery(GET_QUIZ_ITEM_DATA, {
    variables: { quizId, level, quizItemId },
    skip: !quizId || !level || !quizItemId,
  });

  const { duoAnswersIndexes } = useDuoAnswersIndexes({
    shortId: game.shortId,
    quizItemData,
  });

  const networkStatus = getGlobalNetworkStatus({
    networkStatuses: [quizItemDataNetworkStatus],
    booleanCondition: duoAnswersIndexes !== undefined,
  });

  return {
    ready: (
      <FullHeightLayout className="d-flex flex-column align-center" padding="10px 20px">
        {
          {
            caPasseOuCaCash: (
              <DuoCarreCashAnswerContainer
                game={game}
                quizItemData={quizItemData}
                duoAnswersIndexes={duoAnswersIndexes}
                playerId={playerId}
              />
            ),
          }[(stage as unknown) as QuizStage]
        }
      </FullHeightLayout>
    ),
    loading: <FullHeightLoader />,
    error: (
      <FullScreenError
        errorLabel="Erreur lors du chargement du quiz."
        link="/"
        linkLabel="Retourner au menu principal"
      />
    ),
  }[networkStatus];
};
