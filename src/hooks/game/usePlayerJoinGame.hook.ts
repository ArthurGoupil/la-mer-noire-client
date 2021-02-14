import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import ECookieName from "constants/Cookies.constants";
import { ADD_PLAYER_TO_GAME } from "services/games.service";
import { CREATE_PLAYER } from "services/players.service";
import { setCookie } from "utils/cookies.util";

interface UsePlayerJoinGameProps {
  shortId: string;
}

interface UsePlayerJoinGameReturn {
  handlePlayerJoinGame: ({ name }: HandlePlayerJoinGameProps) => Promise<void>;
}

export interface HandlePlayerJoinGameProps {
  name: string;
}

const usePlayerJoinGame = ({
  shortId,
}: UsePlayerJoinGameProps): UsePlayerJoinGameReturn => {
  const history = useHistory();
  const [createPlayer] = useMutation(CREATE_PLAYER);
  const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);

  const handlePlayerJoinGame = async ({ name }: HandlePlayerJoinGameProps) => {
    const createdPlayer = (await createPlayer({ variables: { name } })).data
      .createPlayer;
    setCookie({
      prefix: shortId,
      cookieName: ECookieName.playerId,
      cookieValue: createdPlayer._id,
    });
    await addPlayerToGame({
      variables: { playerId: createdPlayer._id, shortId },
    });
    history.push(`/games/${shortId.toUpperCase()}/play`);
  };

  return { handlePlayerJoinGame };
};

export default usePlayerJoinGame;
