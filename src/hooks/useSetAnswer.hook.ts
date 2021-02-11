import { useMutation } from "@apollo/client";

import ECookieName from "constants/Cookies.constants";
import { Answer, AnswerType } from "models/Game.model";
import { GIVE_ANSWER } from "services/games.service";
import { setCookie } from "utils/cookies.util";

interface SetAnswerProps {
  shortId: string;
  quizId: string;
  answer: string;
  answerType: AnswerType;
  playerId: string;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
}

const useSetAnswer = (): ((props: SetAnswerProps) => void) => {
  const [giveAnswer] = useMutation(GIVE_ANSWER);

  const setAnswer = async ({
    shortId,
    quizId,
    answer,
    answerType,
    playerId,
    setSelectedAnswer,
  }: SetAnswerProps): Promise<void> => {
    setSelectedAnswer({ quizId, answer, answerType });
    setCookie({
      prefix: shortId,
      cookieName: ECookieName.currentAnswer,
      cookieValue: { quizId, answer, answerType },
    });
    await giveAnswer({
      variables: {
        shortId,
        playerId,
        answer,
        answerType,
      },
    });
  };

  return setAnswer;
};

export default useSetAnswer;
