import React from "react";
import { useParams } from "react-router-dom";

import { GAME_STAGE_UPDATED } from "services/games.service";
import Loader from "components/Utils/Loader";
import GamePreparation from "components/Game/GameStates/GamePreparation";
import { EGameStage } from "constants/GameCurrentState.constants";
import Quiz from "components/Game/GameStates/Quiz";
import { ECookieName } from "constants/Cookies.constants";
import useUpdatedData from "hooks/useUpdatedData";
import FullScreenError from "components/Utils/FullScreenError";

interface Params {
  shortId: string;
  userType: string;
}

const Home: React.FC<{}> = (): JSX.Element => {
  const { shortId, userType } = useParams<Params>();
  const gameStage = useUpdatedData<string>({
    shortId,
    subscription: GAME_STAGE_UPDATED,
    subscriptionName: "gameStageUpdated",
    subscriptionReturnVariable: "stage",
    cookieName: ECookieName.stage,
  });

  const getCurrentComponent = ({
    gameStage,
  }: {
    gameStage: string;
  }): JSX.Element => {
    switch (gameStage) {
      case EGameStage.playersRegistration:
        return <GamePreparation shortId={shortId} userType={userType} />;
      case EGameStage.question: {
        return <Quiz shortId={shortId} userType={userType} />;
      }
      default:
        return (
          <FullScreenError
            errorLabel={`Erreur de type "unknown game current state."`}
            link="/"
            linkLabel="Revenir au menu principal"
          />
        );
    }
  };

  return gameStage ? (
    getCurrentComponent({ gameStage })
  ) : (
    <Loader containerHeight="100vh" />
  );
};

export default Home;
