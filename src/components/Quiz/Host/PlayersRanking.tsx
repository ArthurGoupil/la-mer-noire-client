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

  return (
    <RankingContainer ref={rankingRef} opacity={opacity}>
      <RankingTitle>CLASSEMENT</RankingTitle>
      <Flipper flipKey={JSON.stringify(playersRanking)}>
        <ul className="list">
          {playersRanking.map((playerRanking, index) => {
            return (
              <Flipped
                key={playerRanking.playerId}
                flipId={playerRanking.playerId}
              >
                <PlayerRankingContainer className="d-flex space-between align-center">
                  <PlayerRank className="d-flex justify-start align-center">
                    {index + 1}
                  </PlayerRank>
                  <PlayerName className="d-flex justify-center align-center">
                    {players
                      .find(
                        (playerData) =>
                          playerData.player._id === playerRanking.playerId,
                      )
                      ?.player.name.toUpperCase()}
                  </PlayerName>
                  <PlayerPointsContainer className="d-flex justify-center align-center">
                    <PlayerPoints
                      shouldRotate={
                        isNewRanking &&
                        playerRanking.totalPoints !==
                          playerRanking.formerTotalPoints
                      }
                    >
                      {isNewRanking
                        ? playerRanking.totalPoints
                        : playerRanking.formerTotalPoints}
                    </PlayerPoints>
                  </PlayerPointsContainer>
                </PlayerRankingContainer>
              </Flipped>
            );
          })}
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
  text-shadow: 2px 2px 0 ${EStyles.redOrange};
  margin-bottom: 30px;
  text-align: center;
`;

const PlayerRankingContainer = styled.li`
  height: 45px;
  font-family: "Boogaloo", cursive;
  margin: 10px;
`;

const PlayerRank = styled.span`
  height: 100%;
  margin-right: 20px;
  border-radius: 5px;
  padding-right: 3px;
  font-size: 30px;
  color: white;
  text-shadow: 2px 2px 0 ${EStyles.red};
`;

const PlayerName = styled.span`
  min-width: 150px;
  height: 100%;
  font-size: 20px;
  background: linear-gradient(
    to bottom,
    ${EStyles.blue} 0%,
    ${EStyles.lightBlue} 150%
  );
  border-radius: 5px;
  text-shadow: 2px 2px 0 ${EStyles.blue};
`;

const PlayerPointsContainer = styled.span`
  width: 45px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    ${EStyles.orange} 0%,
    ${EStyles.redOrange} 170%
  );
  margin-left: 5px;
  border-radius: 5px;
  padding-right: 3px;
`;

const PlayerPoints = styled.span<{ shouldRotate: boolean }>`
  font-size: 30px;
  color: white;
  text-shadow: 2px 2px 0 ${EStyles.red};
  transform: ${(props) =>
    props.shouldRotate ? "rotate(720deg)" : "rotate(0deg)"};
  transition: transform 1s;
`;
