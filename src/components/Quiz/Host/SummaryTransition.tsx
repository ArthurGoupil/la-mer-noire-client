import React from "react";

import { PlayerSummary } from "hooks/game/useCaPasseOuCaCashQuestionSummary.hook";
import { PlayerData } from "models/Game.model";
import { QuestionSummary } from "./QuestionSummary";
import { PlayersRanking } from "./PlayersRanking";
import { AnimatedBackground } from "components/Utils/AnimatedBackground";

interface SummaryTransitionProps {
  quizAnswer: string;
  questionSummary: Record<string, PlayerSummary> | null;
  players: PlayerData[];
  onReady: () => void;
}

type CurrentStep = "questionSummary" | "ranking";

export const SummaryTransition: React.FC<SummaryTransitionProps> = ({
  quizAnswer,
  questionSummary,
  players,
  onReady,
}): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);
  const [currentStep, setCurrentStep] = React.useState<CurrentStep>(
    "questionSummary",
  );

  const rankingRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShow(true);
    }, 1000);
    const rankingTimeout = setTimeout(() => {
      setCurrentStep("ranking");
    }, 7000);
    const readyTimeout = setTimeout(() => {
      onReady();
      setShow(false);
    }, 11000);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(rankingTimeout);
      clearTimeout(readyTimeout);
    };
  }, []);

  return (
    <AnimatedBackground show={show}>
      {questionSummary && (
        <>
          <QuestionSummary
            quizAnswer={quizAnswer}
            questionSummary={questionSummary}
            players={players}
            opacity={currentStep === "questionSummary" ? 1 : 0}
          />
          <PlayersRanking
            rankingRef={rankingRef}
            questionSummary={questionSummary}
            players={players}
            opacity={currentStep === "ranking" ? 1 : 0}
          />
        </>
      )}
    </AnimatedBackground>
  );
};
