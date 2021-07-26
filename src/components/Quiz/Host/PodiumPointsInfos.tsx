import { PlayerData } from "models/Game.model";
import React from "react";
import styled from "styled-components";
import { ScubaDiver } from "./ScubaDiver";
import { Trophy } from "./Trophy";

interface PodiumPointsInfos {
  playersRanking: string[];
  players: PlayerData[];
}

export const PodiumPointsInfos: React.FC<PodiumPointsInfos> = ({
  playersRanking,
  players,
}): JSX.Element => {
  const winnerPlayer = players.find(
    (playerData) => playerData.player._id === playersRanking[0],
  )?.player;
  const silverPlayer = players.find(
    (playerData) => playerData.player._id === playersRanking[1],
  )?.player;
  const bronzePlayer = players.find(
    (playerData) => playerData.player._id === playersRanking[2],
  )?.player;

  return (
    <div className="d-flex justify-center align-center">
      <SilverContainer className="d-flex flex-column align-center">
        <Trophy src="/icons/silver.svg" width="100%" />
        <PlayerName>{silverPlayer.name.toUpperCase()}</PlayerName>
      </SilverContainer>
      <WinnerContainer className="d-flex flex-column align-center">
        <Trophy src="/icons/trophy.svg" width="100%" />
        <PlayerName>{winnerPlayer.name.toUpperCase()}</PlayerName>
        <ScubaDiver
          diverNumber={scubaDiversNumbers[playerData.player._id]}
          playerName={playerData.player.name}
          height={scubaDiverHeight}
          containerWidth={scubaDiversContainerWidth}
          answersFactor={racePlayersAnswers[playerData.player._id].answersFactor}
          playerRanking={playersRanking.indexOf(playerData.player._id) + 1}
        />
      </WinnerContainer>
      {playersRanking.length > 2 && (
        <BronzeContainer className="d-flex flex-column align-center">
          <Trophy src="/icons/bronze.svg" width="100%" />
          <PlayerName>{bronzePlayer.name.toUpperCase()}</PlayerName>
        </BronzeContainer>
      )}
    </div>
  );
};

const SilverContainer = styled.span`
  width: 10%;
  margin-bottom: 20px;
`;

const WinnerContainer = styled.span`
  width: 10%;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 25%;
`;

const BronzeContainer = styled.span`
  width: 10%;
  margin-bottom: -10%;
`;

const PlayerName = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 20px;
  margin-top: 15px;
`;
