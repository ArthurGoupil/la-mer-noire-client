import React from "react";
import { useQuery, useSubscription } from "@apollo/client";
import styled from "styled-components";

import { PLAYER_ANSWERED } from "services/games.service";
import Loader from "components/Utils/Loader";
import { Answer, Game, QuizItemId, QuizItemLevel } from "models/Game.model";
import { getCookie, setCookie } from "utils/cookies.util";
import ECookieName from "constants/Cookies.constants";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import LMNLogo from "components/Utils/LMNLogo";
import GameName from "components/Quiz/Host/GameName";
import StageName from "components/Quiz/Host/StageName";
import FullScreenError from "components/Utils/FullScreenError";
import getHostCurrentContainer from "utils/Game/getHostCurrentContainer.util";
import FullWidthContainer from "components/Utils/FullWidthContainer";
import { GET_QUIZ_ITEM_DATA } from "services/quizzes.service";

interface HostProps {
  game: Game;
}

export interface GenerateNewQuizItemDataProps {
  quizItemLevel: QuizItemLevel;
  quizItemId: QuizItemId;
}

const Host: React.FC<HostProps> = ({ game }): JSX.Element => {
  const { shortId, stage, name, currentQuizItem } = game;
  const { quizId, level, quizItemId, createdAtTimestamp } = currentQuizItem;

  const {
    data: { quizItemData } = { quizItemData: null },
    loading: quizItemDataLoading,
    error: quizItemDataError,
  } = useQuery(GET_QUIZ_ITEM_DATA, {
    variables: { quizId, level, quizItemId, createdAtTimestamp },
  });

  const { data: answerData } = useSubscription(PLAYER_ANSWERED, {
    variables: { shortId },
  });

  const [playersAnswers, setPlayersAnswers] = React.useState<
    Record<string, Answer>
  >(
    getCookie({
      prefix: shortId,
      cookieName: ECookieName.playersAnswers,
    }) || {},
  );

  React.useEffect(() => {
    if (answerData && quizItemData) {
      const playerId = answerData.playerAnswered.playerId;
      if (playersAnswers[playerId]?.quizId !== quizItemData.quizId) {
        playersAnswers[playerId] = {
          quizId: quizItemData.quizId,
          answer: answerData.playerAnswered.answer,
        };
      }
      setPlayersAnswers({ ...playersAnswers });
      setCookie({
        prefix: shortId,
        cookieName: ECookieName.playersAnswers,
        cookieValue: playersAnswers,
      });
    }
  }, [answerData]);

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
      {getHostCurrentContainer({
        game,
        quizItemData,
        playersAnswers,
      })}
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
