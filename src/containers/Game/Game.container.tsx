import React from "react";
import { useParams } from "react-router-dom";

import { FullScreenError } from "components/Utils/FullScreenError";
import { useGame } from "hooks/game/useGame.hook";
import { EUserType } from "constants/GameUserType.constants";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";
import { error, loading, ready } from "constants/NetworkStatuses.constants";
import { GamePreparationContainer } from "./GamePreparation/GamePreparation.container";
import { QuizContainer } from "containers/Game/Quiz/Quiz.container";
import { getNetworkStatus } from "utils/networkStatus.util";

interface Params {
  shortId: string;
  userType: EUserType;
}

export const GameContainer: React.FC = (): JSX.Element => {
  const { shortId, userType } = useParams<Params>();
  const { game, networkStatus } = useGame({
    shortId,
    subscribe: { stage: true, players: true },
  });

  const CurrentContainer = {
    playersRegistration: (
      <GamePreparationContainer game={game} userType={userType} />
    ),
    caPasseOuCaCash: <QuizContainer game={game} userType={userType} />,
  }[game?.stage];

  return {
    [ready]: CurrentContainer,
    [loading]: <FullHeightLoader />,
    [error]: (
      <FullScreenError
        errorLabel="La partie n'existe pas, vérifiez le code et réessayez."
        link="/"
        linkLabel="Revenir au menu principal"
      />
    ),
  }[getNetworkStatus(networkStatus)];
};
