import { useMutation } from "@apollo/client";

import ECookieName from "constants/Cookies.constants";
import { Answer } from "models/Game";
import { GIVE_ANSWER } from "services/games.service";
import { setCookie } from "utils/cookies.utils";

interface SetAnswerProps {
  shortId: string;
  quizId: string;
  answer: string;
  playerId: string;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
}

const setAnswer = ({
  shortId,
  quizId,
  answer,
  playerId,
  setSelectedAnswer,
}: SetAnswerProps): (() => void) => {
  const [giveAnswer] = useMutation(GIVE_ANSWER);

  const handleSetAnswer = async (): Promise<void> => {
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

  return handleSetAnswer;
};

export default setAnswer;
