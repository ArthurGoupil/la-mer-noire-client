import React from "react";
import { useParams } from "react-router-dom";

import { FullScreenError } from "components/Utils/FullScreenError";
import { useGame } from "hooks/game/useGame.hook";
import { EUserType } from "constants/GameUserType.constants";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";
import { GamePreparationContainer } from "./GamePreparation/GamePreparation.container";
import { QuizContainer } from "containers/Game/Quiz/Quiz.container";
import { getNS } from "utils/networkStatus.util";

interface Params {
  shortId: string;
  userType: EUserType;
}

export const GameContainer: React.FC = (): JSX.Element => {
  const { shortId, userType } = useParams<Params>();
  const { game, networkStatus } = useGame({
    shortId,
    subscribe: {
      stage: true,
    },
  });

  const CurrentContainer = {
    playersRegistration: (
      <GamePreparationContainer shortId={shortId} userType={userType} />
    ),
    caPasseOuCaCash: <QuizContainer shortId={shortId} userType={userType} />,
  }[game?.stage];

  return {
    ready: CurrentContainer,
    loading: <FullHeightLoader />,
    error: (
      <FullScreenError
        errorLabel="La partie n'existe pas, vérifiez le code et réessayez."
        link="/"
        linkLabel="Revenir au menu principal"
      />
    ),
  }[getNS(networkStatus)];
};
