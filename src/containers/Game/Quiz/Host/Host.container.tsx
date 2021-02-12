import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import Loader from "components/Utils/Loader";
import { Game, QuizItemId, QuizItemLevel } from "models/Game.model";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import LMNLogo from "components/Utils/LMNLogo";
import GameName from "components/Quiz/Host/GameName";
import StageName from "components/Quiz/Host/StageName";
import FullScreenError from "components/Utils/FullScreenError";
import FullWidthContainer from "components/Utils/FullWidthContainer";
import { GET_QUIZ_ITEM_DATA } from "services/quizzes.service";
import HostCurrentContainer from "components/Quiz/Host/HostCurrentContainer";

interface HostProps {
  game: Game;
}

export interface GenerateNewQuizItemDataProps {
  quizItemLevel: QuizItemLevel;
  quizItemId: QuizItemId;
}

const Host: React.FC<HostProps> = ({ game }): JSX.Element => {
  const { stage, name, currentQuizItem } = game;
  const { quizId, level, quizItemId, createdAtTimestamp } = currentQuizItem;

  const {
    data: { quizItemData } = { quizItemData: null },
    loading: quizItemDataLoading,
    error: quizItemDataError,
  } = useQuery(GET_QUIZ_ITEM_DATA, {
    variables: { quizId, level, quizItemId, createdAtTimestamp },
  });

  if (quizItemDataError) {
    return (
      <FullScreenError
        errorLabel="Erreur ! Quiz non trouvé."
        link="/"
        linkLabel="Retourner au menu principal"
      />
    );
  }

  return game && !quizItemDataLoading && quizItemData ? (
    <FullHeightContainer className="d-flex flex-column align-center">
      <FullWidthContainer className="d-flex space-between" margin="0 0 30px 0">
        <LMNLogo width="220px" margin={`0 0 30px 0`} />
        <GameName gameName={name} />
        <EmptyDivForFullScreenIcon />
      </FullWidthContainer>
      <StageName gameStage={stage} />
      <HostCurrentContainer game={game} quizItemData={quizItemData} />
    </FullHeightContainer>
  ) : (
    <FullHeightContainer className="d-flex justify-center align-center">
      <Loader />
    </FullHeightContainer>
  );
};

const EmptyDivForFullScreenIcon = styled.div`
  width: 220px;
`;

export default Host;
