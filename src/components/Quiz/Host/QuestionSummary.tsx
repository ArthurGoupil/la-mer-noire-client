import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { PlayerData } from "models/Game.model";
import { PlayerSummary } from "hooks/game/useCaPasseOuCaCashQuestionSummary.hook";

interface QuestionSummary {
  quizAnswer: string;
  questionSummary: Record<string, PlayerSummary>;
  players: PlayerData[];
  opacity: number;
}

export const QuestionSummary: React.FC<QuestionSummary> = ({
  quizAnswer,
  questionSummary,
  players,
  opacity,
}): JSX.Element => {
  const additionalPointsRef = React.useRef<HTMLDivElement>(null);
  const [
    additionalPointsAreVisible,
    setAdditionalPointsAreVisible,
  ] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setAdditionalPointsAreVisible(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <QuestionSummaryContainer
      opacity={opacity}
      className="d-flex flex-column justify-center align-center"
    >
      <AnswerContainer>
        La réponse était <Answer>{quizAnswer.toUpperCase()}</Answer>
      </AnswerContainer>
      {players.map((playerData, index) => {
        return (
          <PlayerAnswerContainer key={index} className="d-flex">
            <PlayerName>{playerData.player.name}</PlayerName>
            {questionSummary[playerData.player._id].answer ? (
              <>
                a répondu{" "}
                <PlayerAnswer>
                  {questionSummary[playerData.player._id].answer.toUpperCase()}
                </PlayerAnswer>
              </>
            ) : (
              " n'a pas répondu."
            )}
            <AdditionalPointsContainer
              width={
                additionalPointsAreVisible
                  ? additionalPointsRef.current?.clientWidth
                  : 0
              }
            >
              <AdditionalPoints ref={additionalPointsRef}>
                +{questionSummary[playerData.player._id].additionalPoints}
              </AdditionalPoints>
            </AdditionalPointsContainer>
          </PlayerAnswerContainer>
        );
      })}
    </QuestionSummaryContainer>
  );
};

const QuestionSummaryContainer = styled.div<{ opacity: number }>`
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s;
  position: absolute;
`;

const AnswerContainer = styled.div`
  font-size: 23px;
  margin-bottom: 30px;
  text-align: center;
`;

const Answer = styled.span`
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  line-height: 30px;
  color: ${EStyles.redOrange};
`;

const PlayerAnswerContainer = styled.div`
  margin-bottom: 10px;
`;

const PlayerAnswer = styled.span`
  font-family: "Boogaloo", cursive;
  line-height: 27px;
  margin-left: 10px;
  color: ${EStyles.turquoise};
`;

const PlayerName = styled.span`
  font-weight: 600;
  color: ${EStyles.turquoise};
  margin-right: 10px;
`;

const AdditionalPointsContainer = styled.div<{ width: number | undefined }>`
  width: ${(props) => props.width}px;
  overflow: hidden;
  position: relative;
  transition: width 0.5s;
`;

const AdditionalPoints = styled.div`
  font-family: "Boogaloo", cursive;
  margin-left: 0px;
  font-size: 25px;
  color: ${EStyles.lightBlue};
  position: absolute;
  left: 0;
  padding-left: 10px;
`;
