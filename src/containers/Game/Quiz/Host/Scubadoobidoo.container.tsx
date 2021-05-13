import React from "react";
import styled from "styled-components";

import { Game } from "models/Game.model";
import { QuizLayout } from "components/Quiz/Host/QuizLayout";
import { ScubaDiver } from "components/Quiz/Host/ScubaDiver";
import { getScubaDiversNumbers } from "utils/quiz/getScubaDiversNumbers";

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

  return (
    <QuizLayout stage={game.stage} gameName={game.name} showTopScreen={false} topScreens={[]}>
      <ScubaDiversContainer
        ref={scubaDiversContainerRef}
        className="d-flex flex-column space-around"
      >
        {game.players.map((playerData, index) => {
          return (
            <ScubaDiver
              key={index}
              diverNumber={scubaDiversNumbers[playerData.player._id]}
              playerName={playerData.player.name}
              height={scubaDiverHeight}
              containerWidth={scubaDiversContainerWidth}
              numberOfGoodAnswers={4}
            />
          );
        })}
      </ScubaDiversContainer>
    </QuizLayout>
  );
};

const ScubaDiversContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 40px;
`;
