/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";

import { Styles } from "constants/Styling.constants";
import { PlayerData } from "models/Game.model";

interface PlayersListProps {
  playersList: PlayerData[];
}

export const PlayersList: React.FC<PlayersListProps> = ({ playersList }): JSX.Element => {
  return (
    <PlayersListContainer className="d-flex flex-column align-center flex-wrap">
      <PlayersTitle>DANS LES STARTING BLOCKS</PlayersTitle>
      <div className="d-flex justify-center flex-wrap">
        {playersList.map((playerData: PlayerData, index: number) => (
          <Player key={index}>{playerData.player.name.toUpperCase()}</Player>
        ))}
      </div>
    </PlayersListContainer>
  );
};

const PlayersListContainer = styled.ul`
  margin-bottom: 10px;
  max-width: 90vw;
`;

const PlayersTitle = styled.div`
  font-family: "Boogaloo", cursive;
  font-size: 28px;
  line-height: 32px;
  color: ${Styles.redOrange};
  text-align: center;
  margin: 10px 0;
`;

const Player = styled.li`
  font-family: "Boogaloo", cursive;
  font-size: 18px;
  line-height: 22px;
  background-color: ${Styles.darkBlue};
  text-align: center;
  padding: 10px 16px;
  margin: 7px;
  border-radius: 100px;
`;
