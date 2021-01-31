import React from "react";
import { useMutation } from "@apollo/client";

import { ECookieName } from "constants/Cookies.constants";
import { EGameStage } from "constants/GameCurrentState.constants";
import EStyles from "constants/Styling.constants";
import { setGameCookie } from "utils/cookies.utils";
import {
  UPDATE_GAME_CURRENT_QUIZ_ITEM,
  UPDATE_GAME_STAGE,
} from "services/games.service";
import Button from "components/Utils/Button";
import { getLazyRandomQuizId } from "services/quizzes.service";

interface LaunchGameButtonProps {
  shortId: string;
  show: boolean;
}

const LaunchGame: React.FC<LaunchGameButtonProps> = ({
  shortId,
  show,
}): JSX.Element => {
  const [launchCounter, setLaunchCounter] = React.useState<number | null>(null);
  const [updateGameStage] = useMutation(UPDATE_GAME_STAGE);
  const [updateGameCurrentQuizItem] = useMutation(
    UPDATE_GAME_CURRENT_QUIZ_ITEM,
  );

  const { triggerGetRandomQuiz, randomQuizIdData } = getLazyRandomQuizId();

  const handleLaunchGame = async ({ quizId }: { quizId: string }) => {
    const currentQuizItem = {
      quizId: quizId,
      level: "intermediate",
      quizItemId: 2,
    };
    await updateGameCurrentQuizItem({
      variables: { shortId, currentQuizItem },
    });
    setGameCookie({
      prefix: shortId,
      cookieName: ECookieName.currentQuizItem,
      cookieValue: currentQuizItem,
    });
    await updateGameStage({
      variables: { stage: EGameStage.question, shortId },
    });
  };

  React.useEffect(() => {
    if (randomQuizIdData) {
      handleLaunchGame({ quizId: randomQuizIdData.randomQuizId });
    }
  }, [randomQuizIdData]);

  const handleLaunchCounter = () => {
    if (!launchCounter) {
      setLaunchCounter(5);
    } else {
      setLaunchCounter(null);
    }
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (launchCounter && launchCounter > 0) {
      timeout = setTimeout(() => {
        setLaunchCounter(launchCounter - 1);
      }, 1000);
    } else if (launchCounter === 0) {
      triggerGetRandomQuiz();
    }

    return () => clearTimeout(timeout);
  }, [launchCounter]);

  return (
    <Button
      onClick={handleLaunchCounter}
      label={
        launchCounter
          ? `Lancement dans ... ${launchCounter.toString()}s (cliquez pour annuler)`
          : "Tout le monde est prêt !"
      }
      color={EStyles.darkBlue}
      backgroundColor={EStyles.turquoise}
      hoverColor={EStyles.darken_turquoise}
      show={show}
    />
  );
};

export default LaunchGame;
