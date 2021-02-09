import { useMutation } from "@apollo/client";

import ECookieName from "constants/Cookies.constants";
import { Answer } from "models/Game.model";
import { GIVE_ANSWER } from "services/games.service";
import { setCookie } from "utils/cookies.util";

interface SetAnswerProps {
  shortId: string;
  quizId: string;
  answer: string;
  playerId: string;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
}

const useAnswer = (): ((props: SetAnswerProps) => void) => {
  const [giveAnswer] = useMutation(GIVE_ANSWER);

  const setAnswer = async ({
    shortId,
    quizId,
    answer,
    playerId,
    setSelectedAnswer,
  }: SetAnswerProps): Promise<void> => {
    setSelectedAnswer({ quizId, answer });
    setCookie({
      prefix: shortId,
      cookieName: ECookieName.currentAnswer,
      cookieValue: { quizId, answer },
    });
    await giveAnswer({
      variables: {
        shortId,
        playerId,
        answer,
      },
    });
  };

  return setAnswer;
};

export default useAnswer;
