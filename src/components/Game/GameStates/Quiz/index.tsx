import React from "react";

import PlayerView from "./PlayerView";
import HostView from "./HostView";
import { ECookieName } from "constants/Cookies.constants";
import FullScreenError from "components/Utils/FullScreenError";
import useGameCookie from "hooks/useGameCookies";

interface QuizProps {
  shortId: string;
  userType: string;
}

const Quiz: React.FC<QuizProps> = ({ shortId, userType }): JSX.Element => {
  const playerId = useGameCookie<string>({
    prefix: shortId,
    cookieName: ECookieName.playerId,
  });

  if (userType === "play") {
    if (playerId) {
      return <PlayerView shortId={shortId} playerId={playerId} />;
    } else {
      return (
        <FullScreenError
          errorLabel="Erreur ! Vous n'avez pas pu être identifié par vos cookies.
      Assurez-vous de ne pas être en navigation privée."
        />
      );
    }
  }

  if (userType === "host") {
    return <HostView shortId={shortId} />;
  }

  return (
    <FullScreenError errorLabel="Erreur inconnue ! Veuillez relancer la partie." />
  );
};

export default Quiz;
