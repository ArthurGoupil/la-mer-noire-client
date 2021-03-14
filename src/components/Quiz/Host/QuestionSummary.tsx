import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";
import { Answer, PlayerData, PlayersPoints } from "models/Game.model";
import { getStringFromAnswerType } from "utils/quiz/getStringFromAnswerType";
import { getAnswerTypeColor } from "utils/quiz/getAnswerTypeColor.util";

interface QuestionSummary {
  quizAnswer: string;
  players: PlayerData[];
  playersAnswers: Record<string, Answer>;
  playersPoints: PlayersPoints;
  showAdditionalPoints: boolean;
}

export const QuestionSummary: React.FC<QuestionSummary> = ({
  quizAnswer,
  players,
  playersAnswers,
  playersPoints,
  showAdditionalPoints,
}): JSX.Element => {
  const playersAnswersRefs = React.useRef(players.map(() => React.createRef<HTMLDivElement>()));

  return (
    <QuestionSummaryContainer className="d-flex flex-column justify-center align-center">
      <AnswerContainer>
        La réponse était <QuizAnswer>{quizAnswer.toUpperCase()}</QuizAnswer>
      </AnswerContainer>
      {players.map((playerData, index) => {
        return (
          <PlayerAnswerContainer key={index} className="d-flex justify-center">
            <div>
              <PlayerName>{playerData.player.name}</PlayerName>
              {playersAnswers[playerData.player._id]?.answer ? (
                <>
                  a répondu
                  <PlayerAnswer
                    color={
                      playersAnswers[playerData.player._id].isGoodAnswer
                        ? Styles.good
                        : Styles.wrong
                    }
                  >
                    {playersAnswers[playerData.player._id].answer.toUpperCase()}
                  </PlayerAnswer>
                  en
                  <PlayerAnswerType
                    backgroundColor={getAnswerTypeColor({
                      answerType: playersAnswers[playerData.player._id].answerType,
                    })}
                    paddingLeft={
                      playersAnswers[playerData.player._id].isFirstGoodCash ? "35px" : "9px"
                    }
                  >
                    {getStringFromAnswerType({
                      answerType: playersAnswers[playerData.player._id].answerType,
                    })}
                    {playersAnswers[playerData.player._id].isFirstGoodCash && (
                      <FirstCash src="/icons/cash-first-white.svg" />
                    )}
                  </PlayerAnswerType>
                </>
              ) : (
                <EmptyAnswer> n&apos;a pas répondu.</EmptyAnswer>
              )}
            </div>
            <AdditionalPointsContainer
              width={
                showAdditionalPoints ? playersAnswersRefs.current[index].current?.clientWidth : 0
              }
            >
              <AdditionalPoints
                ref={playersAnswersRefs.current[index]}
                className="d-flex align-center"
              >
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
  width: 95%;
  position: absolute;
`;

const AnswerContainer = styled.div`
  font-size: 30px;
  line-height: 35px;
  margin-bottom: 40px;
  text-align: center;
`;

const QuizAnswer = styled.span`
  font-family: "Boogaloo", cursive;
  font-size: 40px;
  line-height: 35px;
  color: ${Styles.good};
  margin-left: 10px;
`;

const PlayerAnswerContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  font-size: 22px;
  line-height: 25px;
  text-align: center;
`;

const PlayerAnswer = styled.span<{ color: string }>`
  font-family: "Boogaloo", cursive;
  font-size: 25px;
  line-height: 30px;
  margin: 0 10px;
  color: ${(props) => props.color};
`;

const PlayerAnswerType = styled.span<{ backgroundColor: string; paddingLeft: string }>`
  font-family: "Boogaloo", cursive;
  font-size: 23px;
  line-height: 30px;
  margin-left: 10px;
  background-color: ${(props) => props.backgroundColor};
  padding: 4px ${(props) => props.paddingLeft} 4px 9px;
  border-radius: 5px;
  text-shadow: 3px 2px 0px ${Styles.darkBlue};
  position: relative;
`;

const FirstCash = styled.img`
  height: 25px;
  width: 25px;
  margin-left: 4px;
  position: absolute;
  top: 8px;
  right: 5px;
`;

const EmptyAnswer = styled.span`
  color: tomato;
`;

const PlayerName = styled.span`
  font-weight: 600;
  color: ${Styles.turquoise};
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
  font-size: 35px;
  line-height: 25px;
  color: ${Styles.turquoise};
  position: absolute;
  left: 0;
  padding-left: 10px;
`;
