import React from "react";
import { useSubscription } from "@apollo/client";

import { PLAYER_ANSWERED } from "services/games.service";
import { getCookie, setCookie } from "utils/cookies.util";
import { Answer, Buzz, PlayerData } from "models/Game.model";
import { CookieName } from "constants/Cookies.constants";

interface UsePlayersBuzzProps {
  shortId: string;
  quizItemSignature: string;
  players: PlayerData[];
  canBuzz: boolean;
}

interface UsePlayersBuzzReturn {
  playersBuzz: Record<string, Buzz>;
}

export const usePlayersBuzz = ({
  shortId,
  quizItemSignature,
  players,
  canBuzz,
}: UsePlayersBuzzProps): UsePlayersBuzzReturn => {
  const { data: { playerAnswered } = {} } = useSubscription(PLAYER_ANSWERED, {
    variables: { shortId },
  });

  const [playersBuzz, setPlayersBuzz] = React.useState<Record<string, Buzz>>(
    getCookie({
      prefix: shortId,
      cookieName: CookieName.playersBuzz,
    }) || {},
  );

  React.useEffect(() => {
    if (
      quizItemSignature &&
      Object.keys(playersBuzz).length > 0 &&
      Object.values(playersBuzz)[0]?.quizItemSignature !== quizItemSignature
    ) {
      setPlayersBuzz({});
      setCookie<Record<string, Answer>>({
        prefix: shortId,
        cookieName: CookieName.playersBuzz,
        cookieValue: {},
      });
    }
  }, [quizItemSignature, shortId, playersBuzz]);

  React.useEffect(() => {
    if (
      quizItemSignature &&
      playerAnswered?.quizItemSignature === quizItemSignature &&
      playerAnswered?.answerType === "buzz" &&
      !playersBuzz[playerAnswered?.playerId] &&
      playersBuzz[playerAnswered.playerId]?.quizItemSignature !== quizItemSignature &&
      !Object.keys(playersBuzz).find(
        (playerId) => playersBuzz[playerId]?.answer === playerAnswered?.answer,
      ) &&
      Object.keys(playersBuzz).length !== players.length &&
      canBuzz
    ) {
      playersBuzz[playerAnswered.playerId] = {
        quizItemSignature,
        answer: playerAnswered.answer,
      };
      setPlayersBuzz({ ...playersBuzz });
      setCookie<Record<string, Buzz>>({
        prefix: shortId,
        cookieName: CookieName.playersBuzz,
        cookieValue: playersBuzz,
      });
    }
  }, [
    playerAnswered?.answer,
    playerAnswered?.answerType,
    playerAnswered?.playerId,
    playerAnswered?.quizItemSignature,
    players.length,
    playersBuzz,
    quizItemSignature,
    shortId,
    canBuzz,
  ]);

  return { playersBuzz };
};
