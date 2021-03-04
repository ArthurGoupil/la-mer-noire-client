/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { PlayerData } from "models/Game.model";

interface PlayersListProps {
  playersList: PlayerData[];
}

export const PlayersList: React.FC<PlayersListProps> = ({ playersList }): JSX.Element => {
  return (
    <PlayersListContainer className="d-flex flex-column align-center flex-wrap">
      <PlayersTitle>DANS LES STARTING BLOCKS</PlayersTitle>
      <div className="d-flex flex-wrap">
        {playersList.map((playerData: PlayerData, index: number) => (
          <Player key={index}>{playerData.player.name.toUpperCase()}</Player>
        ))}
      </div>
    </PlayersListContainer>
  );
};

const PlayersListContainer = styled.ul`
  margin-bottom: 10px;
  max-width: 600px;
`;

const PlayersTitle = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 30px;
  color: ${EStyles.redOrange};
  text-align: center;
  margin-bottom: 10px;
`;

const Player = styled.li`
  font-family: "Boogaloo", cursive;
  background-color: ${EStyles.darkBlue};
  text-align: center;
  padding: 13px 18px;
  margin: 7px;
  border-radius: 100px;
`;
