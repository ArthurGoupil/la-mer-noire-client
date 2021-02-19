import React from "react";
import styled from "styled-components";
import { Flipper, Flipped } from "react-flip-toolkit";

import { EStyles } from "constants/Styling.constants";
import { PlayerSummary } from "hooks/game/useCaPasseOuCaCashQuestionSummary.hook";
import { PlayerData } from "models/Game.model";

interface PlayersRankingProps {
  rankingRef: React.RefObject<HTMLDivElement>;
  questionSummary: Record<string, PlayerSummary>;
  players: PlayerData[];
  opacity: number;
}

export const PlayersRanking: React.FC<PlayersRankingProps> = ({
  rankingRef,
  questionSummary,
  players,
  opacity,
}): JSX.Element => {
  const [isNewRanking, setIsNewRanking] = React.useState<boolean>(false);

  const [playersRanking, setPlayersRanking] = React.useState(
    Object.keys(questionSummary || {})
      .map((playerId) => ({
        ...questionSummary[playerId],
        formerTotalPoints:
          questionSummary[playerId].totalPoints -
          questionSummary[playerId].additionalPoints,
        playerId,
      }))
      .sort((a, b) => b.formerTotalPoints - a.formerTotalPoints),
  );

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setPlayersRanking([
        ...playersRanking.sort((a, b) => b.totalPoints - a.totalPoints),
      ]);
      setIsNewRanking(true);
    }, 7000);

    return () => clearTimeout(timeout);
  }, []);

  console.log(rankingRef.current?.clientHeight);

  return (
    <RankingContainer ref={rankingRef} opacity={opacity}>
      <RankingTitle>CLASSEMENT</RankingTitle>
      <Flipper flipKey={JSON.stringify(playersRanking)}>
        <ul className="list">
          {playersRanking.map((playerRanking) => (
            <Flipped
              key={playerRanking.playerId}
              flipId={playerRanking.playerId}
            >
              <PlayerRanking className="d-flex justify-end align-center">
                {players
                  .find(
                    (playerData) =>
                      playerData.player._id === playerRanking.playerId,
                  )
                  ?.player.name.toUpperCase()}{" "}
                <PlayerPoints className="d-flex justify-center align-center">
                  {isNewRanking
                    ? playerRanking.totalPoints
                    : playerRanking.formerTotalPoints}
                </PlayerPoints>
              </PlayerRanking>
            </Flipped>
          ))}
        </ul>
      </Flipper>
    </RankingContainer>
  );
};

const RankingContainer = styled.div<{ opacity: number }>`
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s;
`;

const RankingTitle = styled.h2`
  text-shadow: 2px 2px 0 ${EStyles.orange};
  margin-bottom: 20px;
`;

const PlayerRanking = styled.li`
  min-width: 150px;
  font-family: "Boogaloo", cursive;
  padding: 10px;
  background: linear-gradient(
    to bottom,
    ${EStyles.blue} 0%,
    ${EStyles.lightBlue} 150%
  );
  border-radius: 5px;
  margin: 10px;
`;

const PlayerPoints = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${EStyles.orange};
  margin-left: 20px;
`;
