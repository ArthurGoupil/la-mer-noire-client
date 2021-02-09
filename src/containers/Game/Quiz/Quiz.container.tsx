import React from "react";

import HostContainer from "containers/Game/Quiz/Host/Host.container";
import PlayerContainer from "containers/Game/Quiz/Player/Player.container";
import ECookieName from "constants/Cookies.constants";
import FullScreenError from "components/Utils/FullScreenError";
import { Game } from "models/Game.model";
import EUserType from "constants/GameUserType.constants";
import { getCookie } from "utils/cookies.util";

interface QuizProps {
  game: Game;
  userType: EUserType;
}

const Quiz: React.FC<QuizProps> = ({ game, userType }): JSX.Element => {
  const playerId = getCookie<string>({
    prefix: game.shortId,
    cookieName: ECookieName.playerId,
  });

  if (userType === "host") {
    return <HostContainer game={game} />;
  }

  if (userType === "play") {
    if (playerId) {
      return <PlayerContainer game={game} playerId={playerId} />;
    } else {
      return (
        <FullScreenError
          errorLabel="Erreur ! Vous n'avez pas pu être identifié par vos cookies.
        Assurez-vous de ne pas être en navigation privée."
        />
      );
    }
  }

  if (userType === "join") {
    return (
      <FullScreenError
        errorLabel="La partie a déjà commencé !"
        link={`/games/${game.shortId}/play`}
        linkLabel="Je le sais et je suis un joueur de cette partie"
      />
    );
  }

  return (
    <FullScreenError
      errorLabel="Erreur inconnue."
      linkLabel="Revenir au menu principal"
      link="/"
    />
  );
};

export default Quiz;
