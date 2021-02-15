import { ECookieName } from "constants/Cookies.constants";
import { AnswerTypeChoice } from "models/Game.model";
import React from "react";
import { getCookie, setCookie } from "utils/cookies.util";

interface UseAnswerTypeChoiceProps {
  shortId: string;
}

interface UseAnswerTypeChoiceReturn {
  answerTypeChoice: AnswerTypeChoice;
  setAnswerTypeChoice: React.Dispatch<React.SetStateAction<AnswerTypeChoice>>;
}

export const useAnswerTypeChoice = ({
  shortId,
}: UseAnswerTypeChoiceProps): UseAnswerTypeChoiceReturn => {
  const [
    answerTypeChoice,
    setAnswerTypeChoice,
  ] = React.useState<AnswerTypeChoice>(
    getCookie({ prefix: shortId, cookieName: ECookieName.answerTypeChoice }),
  );

  React.useEffect(() => {
    setCookie({
      prefix: shortId,
      cookieName: ECookieName.answerTypeChoice,
      cookieValue: answerTypeChoice,
    });
  }, [answerTypeChoice]);

  return { answerTypeChoice, setAnswerTypeChoice };
};
