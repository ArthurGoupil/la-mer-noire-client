import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { PlayerSummary } from "hooks/game/useCaPasseOuCaCashQuestionSummary.hook";
import { PlayerData } from "models/Game.model";
import { useWindowHeight } from "hooks/others/useWindowHeight.hook";
import { QuestionSummary } from "./QuestionSummary";
import { PlayersRanking } from "./PlayersRanking";

interface SummaryModal {
  quizAnswer: string;
  questionSummary: Record<string, PlayerSummary> | null;
  players: PlayerData[];
  onReady: () => void;
}

type CurrentStep = "questionSummary" | "ranking";

export const SummaryModal: React.FC<SummaryModal> = ({
  quizAnswer,
  questionSummary,
  players,
  onReady,
}): JSX.Element => {
  const { height } = useWindowHeight();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [currentStep, setCurrentStep] = React.useState<CurrentStep>(
    "questionSummary",
  );

  const rankingRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowModal(true);
    }, 1000);
    const rankingTimeout = setTimeout(() => {
      setCurrentStep("ranking");
    }, 5000);
    const readyTimeout = setTimeout(() => {
      onReady();
    }, 9000);

    return () => {
      clearTimeout(rankingTimeout);
      clearTimeout(readyTimeout);
      clearTimeout(showTimeout);
    };
  }, []);

  return (
    <SummaryModalWrapper
      height={height}
      className="d-flex justify-center align-center"
    >
      <SummaryModalContainer
        className="d-flex flex-column align-center justify-center"
        height={rankingRef.current?.clientHeight}
        opacity={showModal ? 0.97 : 0}
      >
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
      </SummaryModalContainer>
    </SummaryModalWrapper>
  );
};

const SummaryModalWrapper = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  width: 100%;
  position: absolute;
  top: 0;
`;

const SummaryModalContainer = styled.div<{
  height: number | undefined;
  opacity: number;
}>`
  min-width: 40%;
  max-width: 80%;
  height: ${(props) => props.height && props.height + 80}px;
  padding: 40px;
  background: linear-gradient(
    to bottom,
    ${EStyles.darkBlue} 20%,
    ${EStyles.blue} 200%
  );
  border-radius: 10px;
  position: absolute;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3);
  border: 5px solid ${EStyles.yellow};
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s;
`;
