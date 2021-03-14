import React from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { CookieName } from "constants/Cookies.constants";
import { ADD_PLAYER_TO_GAME } from "services/games.service";
import { resetCookies, setCookie } from "utils/cookies.util";

interface UsePlayerJoinGameProps {
  shortId: string;
}

interface UsePlayerJoinGameReturn {
  handlePlayerJoinGame: ({ name }: HandlePlayerJoinGameProps) => Promise<void>;
  loading: boolean;
  errorMessage: string | null;
}

interface HandlePlayerJoinGameProps {
  name: string;
}

export const usePlayerJoinGame = ({ shortId }: UsePlayerJoinGameProps): UsePlayerJoinGameReturn => {
  const history = useHistory();
  const [addPlayerToGame, { loading }] = useMutation(ADD_PLAYER_TO_GAME);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handlePlayerJoinGame = async ({ name }: HandlePlayerJoinGameProps) => {
    try {
      resetCookies();
      setErrorMessage(null);
      const playerId: string = (
        await addPlayerToGame({
          variables: { shortId, name },
        })
      ).data.addPlayerToGame;
      setCookie<string>({
        prefix: shortId,
        cookieName: CookieName.playerId,
        cookieValue: playerId,
      });

      history.push(`/games/${shortId.toUpperCase()}/play`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return { handlePlayerJoinGame, loading, errorMessage };
};
