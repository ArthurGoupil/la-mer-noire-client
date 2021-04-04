import { useMutation } from "@apollo/client";
import { CookieName } from "constants/Cookies.constants";
import { AnswerTypeChoice } from "models/Game.model";
import React from "react";
import { GIVE_ANSWER } from "services/games.service";
import { getCookie, setCookie } from "utils/cookies.util";

interface UseBuzzAnswerTypeChoiceProps {
  shortId: string;
  playerId: string;
  quizItemSignature: string;
}

interface UseBuzzAnswerTypeChoiceReturn {
  buzzAnswerTypeChoice: AnswerTypeChoice;
  setBuzzAnswerTypeChoice: React.Dispatch<React.SetStateAction<AnswerTypeChoice>>;
}

export const useBuzzAnswerTypeChoice = ({
  shortId,
  playerId,
  quizItemSignature,
}: UseBuzzAnswerTypeChoiceProps): UseBuzzAnswerTypeChoiceReturn => {
  const [giveAnswer] = useMutation(GIVE_ANSWER);
  const [buzzAnswerTypeChoice, setBuzzAnswerTypeChoice] = React.useState<AnswerTypeChoice>(
    getCookie({ prefix: shortId, cookieName: CookieName.buzzAnswerTypeChoice }),
  );

  React.useEffect(() => {
    if (buzzAnswerTypeChoice && buzzAnswerTypeChoice.quizItemSignature === quizItemSignature) {
      setCookie<AnswerTypeChoice>({
        prefix: shortId,
        cookieName: CookieName.buzzAnswerTypeChoice,
        cookieValue: buzzAnswerTypeChoice,
      });
      giveAnswer({
        variables: {
          shortId,
          playerId,
          quizItemSignature,
          answer: buzzAnswerTypeChoice.answerType,
          answerType: "buzz",
        },
      });
    }
  }, [buzzAnswerTypeChoice, giveAnswer, playerId, quizItemSignature, shortId]);

  return { buzzAnswerTypeChoice, setBuzzAnswerTypeChoice };
};
