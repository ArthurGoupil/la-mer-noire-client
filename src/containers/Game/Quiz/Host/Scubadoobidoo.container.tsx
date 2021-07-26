import React from "react";
import styled from "styled-components";

import { Game } from "models/Game.model";
import { QuizLayout } from "components/Quiz/Host/QuizLayout";
import { ScubaDiverRacer } from "components/Quiz/Host/ScubaDiverRacer";
import { getScubaDiversNumbers } from "utils/quiz/getScubaDiversNumbers";
import { useRacePlayersAnswers } from "hooks/quiz/useRacePlayersAnswer.hook";
import { ArrivalLine } from "components/Quiz/Host/ArrivalLine";
import { StageName } from "components/Quiz/Host/StageName";
import { QuestionSummary } from "components/Quiz/Host/QuestionSummary";
import { PlayersRanking } from "components/Quiz/Host/PlayersRanking";
import { useScubadoobidooState } from "hooks/game/useScubadoobidooState.hook";
import { getScubadoobidooStateInterpretation } from "utils/game/getScubadoobidooStateInterpretation.util";
import { PodiumPointsInfos } from "components/Quiz/Host/PodiumPointsInfos";

interface ScubadoobidooContainerProps {
  game: Game;
}

export const ScubadoobidooContainer: React.FC<ScubadoobidooContainerProps> = ({
  game,
}): JSX.Element => {
  const scubaDiversContainerRef = React.useRef<HTMLDivElement>(null);
  const { scubaDiversNumbers } = getScubaDiversNumbers({
    shortId: game.shortId,
    players: game.players,
  });
  const scubaDiverHeight = ((scubaDiversContainerRef.current?.clientHeight || 0) / 10) * 0.9;
  const scubaDiversContainerWidth = scubaDiversContainerRef.current?.clientWidth || 0;

  const { racePlayersAnswers, playersRanking, raceIsOver } = useRacePlayersAnswers({
    shortId: game.shortId,
    players: game.players,
  });

  const { scubadoobidooState } = useScubadoobidooState({
    shortId: game.shortId,
    raceIsOver,
  });

  const {
    stageNameEnter,
    stageNameCanPlay,
    stageNameLeave,
    podiumPointsInfosEnter,
    raceSummaryEnter,
    raceSummaryLeave,
    showPreviousRanking,
    playersRankingEnter,
    playersRankingLeave,
  } = getScubadoobidooStateInterpretation({
    scubadoobidooState,
  });

  const topScreens = [
    {
      component: <StageName stage={game.stage} canPlaySound={stageNameCanPlay} />,
      shouldEnter: stageNameEnter,
      shouldLeave: stageNameLeave,
    },
    {
      component: <div />,
      shouldEnter: raceSummaryEnter,
      shouldLeave: raceSummaryLeave,
    },
    {
      component: (
        <PlayersRanking
          playersPoints={{}}
          players={game.players}
          showPreviousRanking={showPreviousRanking}
        />
      ),
      shouldEnter: playersRankingEnter,
      shouldLeave: playersRankingLeave,
    },
    {
      component: <PodiumPointsInfos playersRanking={playersRanking} players={game.players} />,
      shouldEnter: true,
      // shouldEnter: podiumPointsInfosEnter,
      shouldLeave: false,
    },
  ];

  return (
    <QuizLayout
      stage={game.stage}
      gameName={game.name}
      showTopScreen={true}
      topScreens={topScreens}
    >
      <ScubaDiversContainer
        ref={scubaDiversContainerRef}
        className="d-flex flex-column space-around"
      >
        {game.players.map((playerData, index) => {
          return (
            <ScubaDiverRacer
              key={index}
              diverNumber={scubaDiversNumbers[playerData.player._id]}
              playerName={playerData.player.name}
              height={scubaDiverHeight}
              containerWidth={scubaDiversContainerWidth}
              answersFactor={racePlayersAnswers[playerData.player._id].answersFactor}
              playerRanking={playersRanking.indexOf(playerData.player._id) + 1}
            />
          );
        })}
        <ArrivalLine containerWidth={scubaDiversContainerWidth} />
      </ScubaDiversContainer>
    </QuizLayout>
  );
};

const ScubaDiversContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  margin-top: 40px;
`;
