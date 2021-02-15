import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { Game, QuizItemId, QuizItemLevel } from "models/Game.model";
import { FullHeightContainer } from "components/Utils/FullHeightContainer";
import { LMNLogo } from "components/Utils/LMNLogo";
import { GameName } from "components/Quiz/Host/GameName";
import { StageName } from "components/Quiz/Host/StageName";
import { FullScreenError } from "components/Utils/FullScreenError";
import { FullWidthContainer } from "components/Utils/FullWidthContainer";
import { GET_QUIZ_ITEM_DATA } from "services/quizzes.service";
import { usePlayersAnswers } from "hooks/quiz/usePlayersAnswers.hook";
import { error, loading, ready } from "constants/NetworkStatuses.constants";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";
import { CaPasseOuCaCashContainer } from "./CaPasseOuCaCash.container";
import { EQuizStage } from "constants/GameStage.constants";
import { getNetworkStatus } from "utils/networkStatus.util";

interface HostProps {
  game: Game;
}

export interface GenerateNewQuizItemDataProps {
  quizItemLevel: QuizItemLevel;
  quizItemId: QuizItemId;
}

export const HostContainer: React.FC<HostProps> = ({ game }): JSX.Element => {
  const { stage, name, currentQuizItem } = game;
  const { quizId, level, quizItemId, createdAtTimestamp } = currentQuizItem;

  const {
    data: { quizItemData } = { quizItemData: null },
    networkStatus,
  } = useQuery(GET_QUIZ_ITEM_DATA, {
    variables: { quizId, level, quizItemId, createdAtTimestamp },
  });

  const { playersAnswers } = usePlayersAnswers({
    shortId: game.shortId,
    quizItemData,
    players: game.players,
  });

  return {
    [ready]: (
      <FullHeightContainer className="d-flex flex-column align-center">
        <FullWidthContainer
          className="d-flex space-between"
          margin="0 0 30px 0"
        >
          <LMNLogo width="220px" margin={`0 0 30px 0`} />
          <GameName gameName={name} />
          <EmptyDivForFullScreenIcon />
        </FullWidthContainer>
        <StageName gameStage={stage} />
        {
          {
            caPasseOuCaCash: (
              <CaPasseOuCaCashContainer
                game={game}
                quizItemData={quizItemData}
                playersAnswers={playersAnswers}
              />
            ),
          }[(stage as unknown) as EQuizStage]
        }
      </FullHeightContainer>
    ),
    [loading]: <FullHeightLoader />,
    [error]: (
      <FullScreenError
        errorLabel="Erreur ! Quiz non trouvé."
        link="/"
        linkLabel="Retourner au menu principal"
      />
    ),
  }[getNetworkStatus(networkStatus)];
};

const EmptyDivForFullScreenIcon = styled.div`
  width: 220px;
`;
