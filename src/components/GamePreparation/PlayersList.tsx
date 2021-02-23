/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { PlayerData } from "models/Game.model";

interface PlayersListProps {
  playersList: PlayerData[];
}

export const PlayersList: React.FC<PlayersListProps> = ({
  playersList,
}): JSX.Element => {
  return (
    <PlayersListContainer className="d-flex justify-center flex-wrap">
      {playersList.map((playerData: PlayerData, index: number) => (
        <Player key={index}>{playerData.player.name.toUpperCase()}</Player>
      ))}
    </PlayersListContainer>
  );
};

const PlayersListContainer = styled.ul`
  margin-bottom: 40px;
  max-width: 600px;
`;

const Player = styled.li`
  font-family: "Boogaloo", cursive;
  background-color: ${EStyles.darkBlue};
  text-align: center;
  padding: 13px 18px;
  margin: 7px;
  border-radius: 100px;
`;
