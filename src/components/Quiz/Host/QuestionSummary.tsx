import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { PlayerData } from "models/Game.model";
import { PlayerSummary } from "hooks/game/useCaPasseOuCaCashQuestionSummary.hook";
import { isValidAnswer } from "utils/quiz/isValidAnswer.util";

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
  const [
    additionalPointsAreVisible,
    setAdditionalPointsAreVisible,
  ] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setAdditionalPointsAreVisible(true);
    }, 4000);

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
        const additionalPointsRef = React.useRef<HTMLDivElement>(null);

        return (
          <PlayerAnswerContainer key={index} className="d-flex">
            <PlayerName>{playerData.player.name}</PlayerName>
            {questionSummary[playerData.player._id].answer ? (
              <>
                a répondu{" "}
                <PlayerAnswer
                  color={
                    isValidAnswer({
                      answer: quizAnswer,
                      givenAnswer:
                        questionSummary[playerData.player._id].answer,
                    })
                      ? "SpringGreen"
                      : "Tomato"
                  }
                >
                  {questionSummary[playerData.player._id].answer.toUpperCase()}
                </PlayerAnswer>
              </>
            ) : (
              <EmptyAnswer> n'a pas répondu.</EmptyAnswer>
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
  font-size: 30px;
  line-height: 35px;
  margin-bottom: 60px;
  text-align: center;
`;

const Answer = styled.span`
  font-family: "Boogaloo", cursive;
  font-size: 40px;
  line-height: 35px;
  color: SpringGreen;
  margin-left: 10px;
`;

const PlayerAnswerContainer = styled.div`
  margin-bottom: 10px;
  font-size: 25px;
  line-height: 30px;
`;

const PlayerAnswer = styled.span<{ color: string }>`
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  line-height: 32px;
  margin-left: 10px;
  color: ${(props) => props.color};
`;

const EmptyAnswer = styled.span`
  color: tomato;
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
  font-size: 30px;
  color: ${EStyles.lightBlue};
  position: absolute;
  left: 0;
  padding-left: 10px;
`;
