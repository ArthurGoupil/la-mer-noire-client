import React from "react";

import { Game } from "models/Game.model";
import { FullScreenError } from "components/Utils/FullScreenError";
import { getCookie } from "utils/cookies.util";
import { CookieName } from "constants/Cookies.constants";
import { FullHeightLayout } from "components/Utils/FullHeightLayout";
import { useQuery } from "@apollo/client";
import { GET_QUIZ_ITEM_DATA } from "services/quizzes.service";
import { CaPasseOuCaCashAnswerContainer } from "./CaPasseOuCaCashAnswer.container";
import { QuizStage } from "constants/GameStage.constants";
import { getGlobalNetworkStatus } from "utils/networkStatus.util";
import { useDuoAnswersIndexes } from "hooks/quiz/useDuoAnswersIndexes.hook";
import { FullHeightWithWaves } from "components/Quiz/Host/FullHeightWithWaves";
import { LMNLogo } from "components/Utils/LMNLogo";
import { KidimieuxAnswerContainer } from "./KidimieuxAnswer.container";
import { ScubadoobidooAnswerContainer } from "./ScubadoobidooAnswer.container";

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

  console.log(networkStatus);

  return {
    ready: (
      <FullHeightLayout className="d-flex flex-column align-center" padding="10px 20px">
        {
          {
            caPasseOuCaCash: (
              <CaPasseOuCaCashAnswerContainer
                game={game}
                quizItemData={quizItemData}
                duoAnswersIndexes={duoAnswersIndexes}
                playerId={playerId}
              />
            ),
            kidimieux: (
              <KidimieuxAnswerContainer
                game={game}
                quizItemData={quizItemData}
                duoAnswersIndexes={duoAnswersIndexes}
                playerId={playerId}
              />
            ),
            scubadoobidoo: <ScubadoobidooAnswerContainer />,
          }[(stage as unknown) as QuizStage]
        }
      </FullHeightLayout>
    ),
    loading: (
      <FullHeightWithWaves>
        <LMNLogo width="100%" />
      </FullHeightWithWaves>
    ),
    error: (
      <FullScreenError
        errorLabel="Erreur lors du chargement du quiz."
        link="/"
        linkLabel="Retourner au menu principal"
      />
    ),
  }[networkStatus];
};
