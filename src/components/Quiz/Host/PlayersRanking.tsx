import React from "react";
import styled from "styled-components";
import { Flipper, Flipped } from "react-flip-toolkit";

import { EStyles } from "constants/Styling.constants";
import { PlayerData, PlayerPoints, PlayersPoints } from "models/Game.model";

interface PlayersRankingProps {
  playersPoints: PlayersPoints;
  players: PlayerData[];
  isPreviousRanking: boolean;
}

interface PlayerRanking extends PlayerPoints {
  playerId: string;
}

export const PlayersRanking: React.FC<PlayersRankingProps> = ({
  playersPoints,
  players,
  isPreviousRanking,
}): JSX.Element => {
  const [playersRanking, setPlayersRanking] = React.useState<PlayerRanking[]>(
    Object.keys(playersPoints)
      .map((playerId) => ({
        ...playersPoints[playerId],
        playerId,
      }))
      .sort((a, b) => b.previous - a.previous),
  );

  React.useEffect(() => {
    if (isPreviousRanking) {
      setPlayersRanking(
        Object.keys(playersPoints)
          .map((playerId) => ({
            ...playersPoints[playerId],
            playerId,
          }))
          .sort((a, b) => b.previous - a.previous),
      );
    } else {
      setPlayersRanking((playersRanking) => [
        ...playersRanking.sort((a, b) => b.current - a.current),
      ]);
    }
  }, [playersPoints, isPreviousRanking]);

  return (
    <RankingContainer>
      <RankingTitle>CLASSEMENT</RankingTitle>
      <Flipper flipKey={JSON.stringify(playersRanking)}>
        <ul className="list">
          {playersRanking.map((playerRanking, index) => {
            const playerRank =
              playersRanking[index - 1]?.current === playerRanking.current ? "-" : index + 1;
            return (
              <Flipped key={playerRanking.playerId} flipId={playerRanking.playerId}>
                <PlayerRankingContainer className="d-flex space-between align-center">
                  <PlayerRank className="d-flex justify-end align-center">{playerRank}</PlayerRank>
                  <PlayerName className="d-flex justify-center align-center flex-grow">
                    {players
                      .find((playerData) => playerData.player._id === playerRanking.playerId)
                      ?.player.name.toUpperCase()}
                  </PlayerName>
                  <PlayerPointsContainer className="d-flex justify-center align-center">
                    <Points
                      shouldRotate={
                        !isPreviousRanking && playerRanking.current !== playerRanking.previous
                      }
                    >
                      {!isPreviousRanking ? playerRanking.current : playerRanking.previous}
                    </Points>
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

const RankingContainer = styled.div`
  transition: opacity 0.5s;
  z-index: 1;
`;

const RankingTitle = styled.h2`
  text-shadow: 2px 2px 0 ${EStyles.redOrange};
  margin-bottom: 50px;
  text-align: center;
  font-size: 50px;
  line-height: 50px;
`;

const PlayerRankingContainer = styled.li`
  height: 50px;
  font-family: "Boogaloo", cursive;
  margin-bottom: 15px;
  margin-right: 10px;
`;

const PlayerRank = styled.span`
  min-width: 30px;
  height: 100%;
  margin-right: 15px;
  border-radius: 5px;
  padding-right: 3px;
  font-size: 40px;
  color: white;
  text-shadow: 2px 2px 0 ${EStyles.red};
`;

const PlayerName = styled.span`
  min-width: 200px;
  height: 100%;
  font-size: 30px;
  background: linear-gradient(to bottom, ${EStyles.darkBlue} 0%, ${EStyles.blue} 150%);
  border-radius: 5px;
  text-shadow: 2px 2px 0 ${EStyles.darkBlue};
  padding: 0 15px;
`;

const PlayerPointsContainer = styled.span`
  width: 45px;
  height: 100%;
  background: linear-gradient(to bottom, ${EStyles.orange} 0%, ${EStyles.redOrange} 170%);
  margin-left: 10px;
  border-radius: 5px;
  padding-right: 3px;
`;

const Points = styled.span<{ shouldRotate: boolean }>`
  font-size: 30px;
  color: white;
  text-shadow: 2px 2px 0 ${EStyles.red};
  transform: ${(props) => (props.shouldRotate ? "rotate(720deg)" : "rotate(0deg)")};
  transition: transform 1s;
`;
