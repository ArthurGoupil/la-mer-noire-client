import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import ECookieName from "constants/Cookies.constants";
import { ADD_PLAYER_TO_GAME } from "services/games.service";
import { CREATE_PLAYER } from "services/players.service";
import { setCookie } from "utils/cookies.util";

interface UseJoinGameProps {
  shortId: string;
}
const useJoinGame = ({ shortId }: UseJoinGameProps) => {
  const history = useHistory();
  const [createPlayer] = useMutation(CREATE_PLAYER);
  const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);

  const handleJoinGame = async (name: string) => {
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

  return handleJoinGame;
};

export default useJoinGame;
