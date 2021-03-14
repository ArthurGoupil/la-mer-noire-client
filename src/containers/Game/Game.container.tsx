import React from "react";
import { useParams } from "react-router-dom";

import { FullScreenError } from "components/Utils/FullScreenError";
import { useGame } from "hooks/game/useGame.hook";
import { UserType } from "constants/GameUserType.constants";
import { FullHeightLoader } from "components/Utils/FullHeightLoader";
import { GamePreparationContainer } from "./GamePreparation/GamePreparation.container";
import { QuizContainer } from "containers/Game/Quiz/Quiz.container";
import { getNS } from "utils/networkStatus.util";

interface Params {
  shortId: string;
  userType: UserType;
}

export const GameContainer: React.FC = (): JSX.Element => {
  const { shortId, userType } = useParams<Params>();
  const { game, networkStatus } = useGame({
    shortId,
    subscribe: {
      stage: true,
    },
  });

  return {
    ready: {
      playersRegistration: <GamePreparationContainer shortId={shortId} userType={userType} />,
      caPasseOuCaCash: <QuizContainer shortId={shortId} userType={userType} />,
    }[game?.stage],
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
