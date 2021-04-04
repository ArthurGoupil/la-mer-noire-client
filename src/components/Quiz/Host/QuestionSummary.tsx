import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";
import { Answer, PlayerData, PlayersPoints } from "models/Game.model";
import { getStringFromAnswerType } from "utils/quiz/getStringFromAnswerType";
import { getAnswerTypeColor } from "utils/quiz/getAnswerTypeColor.util";
import { QuizStage } from "constants/GameStage.constants";

interface QuestionSummary {
  stage: QuizStage;
  quizAnswer: string;
  players: PlayerData[];
  playersAnswers: Record<string, Answer>;
  playersPoints: PlayersPoints;
  showDeltaPoints: boolean;
  currentPlayers: string[];
}

export const QuestionSummary: React.FC<QuestionSummary> = ({
  stage,
  quizAnswer,
  players,
  playersAnswers,
  playersPoints,
  showDeltaPoints,
  currentPlayers,
}): JSX.Element => {
  const playersAnswersRefs = React.useRef(players.map(() => React.createRef<HTMLDivElement>()));

  const playersToMap =
    stage === QuizStage.kidimieux
      ? players.filter((playerData) => currentPlayers.includes(playerData.player._id))
      : players;

  return (
    <QuestionSummaryContainer className="d-flex flex-column justify-center align-center">
      <AnswerContainer>
        La réponse était <QuizAnswer>{quizAnswer.toUpperCase()}</QuizAnswer>
      </AnswerContainer>
      {playersToMap.map((playerData, index) => {
        const answerColor = playersAnswers[playerData.player._id]
          ? playersAnswers[playerData.player._id]?.isGoodAnswer
            ? Styles.good
            : Styles.wrong
          : Styles.turquoise;

        const deltaPoints =
          playersPoints[playerData.player._id].current -
          playersPoints[playerData.player._id].previous;

        const isFirstGoodCash =
          playersAnswers[playerData.player._id]?.isFirstGoodCash && stage !== QuizStage.kidimieux;

        return (
          <PlayerAnswerContainer key={index} className="d-flex justify-center">
            <div>
              <PlayerName color={answerColor}>{playerData.player.name.toUpperCase()}</PlayerName>
              {playersAnswers[playerData.player._id]?.answer ? (
                <>
                  a répondu
                  <PlayerAnswer color={answerColor}>
                    {playersAnswers[playerData.player._id].answer.toUpperCase()}
                  </PlayerAnswer>
                  en
                  <PlayerAnswerType
                    backgroundColor={getAnswerTypeColor({
                      answerType: playersAnswers[playerData.player._id].answerType,
                    })}
                    paddingLeft={isFirstGoodCash ? "35px" : "9px"}
                  >
                    {getStringFromAnswerType({
                      answerType: playersAnswers[playerData.player._id].answerType,
                    })}
                    {isFirstGoodCash && <FirstCash src="/icons/cash-first-white.svg" />}
                  </PlayerAnswerType>
                </>
              ) : (
                <EmptyAnswer> n&apos;a pas répondu.</EmptyAnswer>
              )}
            </div>
            <DeltaPointsContainer
              width={showDeltaPoints ? playersAnswersRefs.current[index].current?.clientWidth : 0}
            >
              <DeltaPoints
                ref={playersAnswersRefs.current[index]}
                color={answerColor}
                className="d-flex align-center"
              >
                {deltaPoints > -1 && "+"}
                {deltaPoints}
              </DeltaPoints>
            </DeltaPointsContainer>
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

const PlayerName = styled.span<{ color: string }>`
  font-family: "Boogaloo", cursive;
  font-size: 25px;
  color: ${(props) => props.color};
  margin-right: 10px;
`;

const PlayerAnswer = styled.span<{ color: string }>`
  font-family: "Boogaloo", cursive;
  font-size: 30px;
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
  height: 27px;
  margin-left: 4px;
  position: absolute;
  top: 4px;
  right: 6px;
`;

const EmptyAnswer = styled.span`
  color: tomato;
`;

const DeltaPointsContainer = styled.div<{ width: number | undefined }>`
  width: ${(props) => props.width}px;
  overflow: hidden;
  position: relative;
  transition: width 0.5s;
`;

const DeltaPoints = styled.div<{ color: string }>`
  font-family: "Boogaloo", cursive;
  font-size: 35px;
  line-height: 25px;
  color: ${(props) => props.color};
  position: absolute;
  left: 0;
  padding-left: 10px;
`;
