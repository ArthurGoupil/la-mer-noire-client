import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { Answer, PlayerData, PlayersPoints } from "models/Game.model";
import { isValidAnswer } from "utils/quiz/isValidAnswer.util";
import { getStringFromAnswerType } from "utils/quiz/getStringFromAnswerType";
import { getAnswerTypeColor } from "utils/quiz/getAnswerTypeColor.util";

interface QuestionSummary {
  quizAnswer: string;
  players: PlayerData[];
  playersAnswers: Record<string, Answer>;
  playersPoints: PlayersPoints;
  additionalPointsAreVisible: boolean;
}

export const QuestionSummary: React.FC<QuestionSummary> = ({
  quizAnswer,
  players,
  playersAnswers,
  playersPoints,
  additionalPointsAreVisible,
}): JSX.Element => {
  const playersAnswersRefs = React.useRef(players.map(() => React.createRef<HTMLDivElement>()));

  return (
    <QuestionSummaryContainer className="d-flex flex-column justify-center align-center">
      <AnswerContainer>
        La réponse était <QuizAnswer>{quizAnswer.toUpperCase()}</QuizAnswer>
      </AnswerContainer>
      {players.map((playerData, index) => {
        return (
          <PlayerAnswerContainer key={index} className="d-flex">
            <div>
              <PlayerName>{playerData.player.name}</PlayerName>
              {playersAnswers[playerData.player._id]?.answer ? (
                <>
                  a répondu{" "}
                  <PlayerAnswer
                    color={
                      isValidAnswer({
                        answer: quizAnswer,
                        givenAnswer: playersAnswers[playerData.player._id].answer,
                      })
                        ? "SpringGreen"
                        : "Tomato"
                    }
                  >
                    {playersAnswers[playerData.player._id].answer.toUpperCase()}
                  </PlayerAnswer>
                  en
                  <PlayerAnswerType
                    backgroundColor={getAnswerTypeColor({
                      answerType: playersAnswers[playerData.player._id].answerType,
                    })}
                  >
                    {getStringFromAnswerType({
                      answerType: playersAnswers[playerData.player._id].answerType,
                    })}
                  </PlayerAnswerType>
                </>
              ) : (
                <EmptyAnswer> n'a pas répondu.</EmptyAnswer>
              )}
            </div>
            <AdditionalPointsContainer
              width={
                additionalPointsAreVisible
                  ? playersAnswersRefs.current[index].current?.clientWidth
                  : 0
              }
            >
              <AdditionalPoints ref={playersAnswersRefs.current[index]}>
                +
                {playersPoints[playerData.player._id].current -
                  playersPoints[playerData.player._id].previous}
              </AdditionalPoints>
            </AdditionalPointsContainer>
          </PlayerAnswerContainer>
        );
      })}
    </QuestionSummaryContainer>
  );
};

const QuestionSummaryContainer = styled.div`
  transition: opacity 0.5s;
  position: absolute;
`;

const AnswerContainer = styled.div`
  font-size: 30px;
  line-height: 35px;
  margin-bottom: 60px;
  text-align: center;
`;

const QuizAnswer = styled.span`
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
  margin: 0 10px;
  color: ${(props) => props.color};
`;

const PlayerAnswerType = styled.span<{ backgroundColor: string }>`
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  line-height: 32px;
  margin-left: 10px;
  background-color: ${(props) => props.backgroundColor};
  padding: 5px 10px;
  border-radius: 5px;
  text-shadow: 3px 2px 0px ${EStyles.darkBlue};
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
  font-size: 40px;
  line-height: 25px;
  color: ${EStyles.turquoise};
  position: absolute;
  left: 0;
  padding-left: 10px;
`;
