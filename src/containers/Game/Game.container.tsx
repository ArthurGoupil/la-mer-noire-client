import React from "react";
import { useParams } from "react-router-dom";

import Loader from "components/Utils/Loader";
import FullScreenError from "components/Error/FullScreenError";
import useGame from "hooks/useGame";
import EUserType from "constants/GameUserType.constants";
import getGameCurrentContainer from "utils/Game/getGameCurrentContainer";

interface Params {
  shortId: string;
  userType: EUserType;
}

const Game: React.FC<{}> = (): JSX.Element => {
  const { shortId, userType } = useParams<Params>();
  const { game, gameError } = useGame({
    shortId,
    subscribe: { stage: true, currentQuizItem: true, players: true },
  });

  if (gameError) {
    return (
      <FullScreenError
        errorLabel="Erreur lors du chargement de la partie."
        link="/"
        linkLabel="Revenir au menu principal"
      />
    );
  }

  return game ? (
    getGameCurrentContainer({ game, userType })
  ) : (
    <Loader containerHeight="100vh" />
  );
};

export default Game;
