import React from "react";
import styled from "styled-components";
import { Flipper, Flipped } from "react-flip-toolkit";

import { Styles } from "constants/Styling.constants";
import { PlayerData, PlayerPoints, PlayersPoints } from "models/Game.model";

interface PlayersRankingProps {
  playersPoints: PlayersPoints;
  players: PlayerData[];
  showPreviousRanking: boolean;
}

interface PlayerRanking extends PlayerPoints {
  playerId: string;
}

export const PlayersRanking: React.FC<PlayersRankingProps> = ({
  playersPoints,
  players,
  showPreviousRanking,
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
    if (showPreviousRanking) {
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
  }, [playersPoints, showPreviousRanking]);

  return (
    <RankingContainer className="d-flex flex-column align-center justify-center">
      <RankingTitle>CLASSEMENT</RankingTitle>
      <StyledFlipper flipKey={JSON.stringify(playersRanking)}>
        <RankingUl className="list d-flex flex-column align-center flex-wrap">
          {playersRanking.map((playerRanking, index) => {
            const playerRank =
              playersRanking[index - 1]?.current === playerRanking.current ? "-" : index + 1;
            return (
              <Flipped key={playerRanking.playerId} flipId={playerRanking.playerId}>
                <PlayerRankingContainer className="d-flex space-between align-center">
                  <PlayerRank className="d-flex justify-end align-center">{playerRank}</PlayerRank>
                  <PlayerName className="d-flex  align-center flex-grow">
                    {players
                      .find((playerData) => playerData.player._id === playerRanking.playerId)
                      ?.player.name.toUpperCase()}
                    <InnerShadow />
                  </PlayerName>
                  <PlayerPointsContainer className="d-flex justify-center align-center">
                    <Points
                      shouldRotate={
                        !showPreviousRanking && playerRanking.current !== playerRanking.previous
                      }
                    >
                      {!showPreviousRanking ? playerRanking.current : playerRanking.previous}
                    </Points>
                  </PlayerPointsContainer>
                </PlayerRankingContainer>
              </Flipped>
            );
          })}
        </RankingUl>
      </StyledFlipper>
    </RankingContainer>
  );
};

const RankingContainer = styled.div`
  width: 60%;
  height: 60%;
  transition: opacity 0.5s;
  z-index: 1;
`;

const RankingTitle = styled.h2`
  text-shadow: 2px 2px 0 ${Styles.redOrange};
  margin-bottom: 50px;
  text-align: center;
  font-size: 50px;
  line-height: 50px;
`;

const StyledFlipper = styled(Flipper)`
  width: 100%;
  height: 100%;
`;

const RankingUl = styled.ul`
  width: 100%;
  height: 100%;
`;

const PlayerRankingContainer = styled.li`
  width: 50%;
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
  text-shadow: 2px 2px 0 ${Styles.red};
`;

const PlayerName = styled.span`
  height: 100%;
  font-size: 25px;
  background: linear-gradient(to bottom, ${Styles.darkBlue} 0%, ${Styles.blue} 150%);
  border-radius: 5px;
  text-shadow: 2px 2px 0 ${Styles.darkBlue};
  padding: 0 15px;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
`;

const InnerShadow = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(to left, ${Styles.darkBlue} 20%, transparent 100%);
  z-index: 1;
  overflow: hidden;
`;

const PlayerPointsContainer = styled.span`
  min-width: 50px;
  height: 100%;
  background: linear-gradient(to bottom, ${Styles.orange} 0%, ${Styles.redOrange} 170%);
  margin-left: 10px;
  border-radius: 5px;
  padding-right: 3px;
`;

const Points = styled.span<{ shouldRotate: boolean }>`
  font-size: 30px;
  color: white;
  text-shadow: 2px 2px 0 ${Styles.red};
  transform: ${(props) => (props.shouldRotate ? "rotate(720deg)" : "rotate(0deg)")};
  transition: transform 1s;
`;
