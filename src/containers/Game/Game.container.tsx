import React from "react";
import { useParams } from "react-router-dom";

import Loader from "components/Utils/Loader";
import FullScreenError from "components/Utils/FullScreenError";
import useGame from "hooks/useGame.hook";
import EUserType from "constants/GameUserType.constants";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import GameCurrentContainer from "components/Game/GameCurrentContainer";

interface Params {
  shortId: string;
  userType: EUserType;
}

const Game: React.FC<{}> = (): JSX.Element => {
  const { shortId, userType } = useParams<Params>();
  const { game, gameError } = useGame({
    shortId,
    subscribe: { stage: true, players: true },
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
    <GameCurrentContainer game={game} userType={userType} />
  ) : (
    <FullHeightContainer className="d-flex justify-center align-center">
      <Loader />
    </FullHeightContainer>
  );
};

export default Game;
