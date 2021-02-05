import React from "react";

import HostContainer from "containers/Game/Quiz/Host.container";
import PlayerContainer from "containers/Game/Quiz/Player.container";
import ECookieName from "constants/Cookies.constants";
import FullScreenError from "components/Error/FullScreenError";
import useCookie from "hooks/useCookie";

interface QuizProps {
  shortId: string;
  userType: string;
}

const Quiz: React.FC<QuizProps> = ({ shortId, userType }): JSX.Element => {
  const playerId = useCookie<string>({
    prefix: shortId,
    cookieName: ECookieName.playerId,
  });

  if (userType === "host") {
    return <HostContainer shortId={shortId} />;
  }

  if (userType === "play") {
    if (playerId) {
      return <PlayerContainer shortId={shortId} playerId={playerId} />;
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
        link={`/games/${shortId}/play`}
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
