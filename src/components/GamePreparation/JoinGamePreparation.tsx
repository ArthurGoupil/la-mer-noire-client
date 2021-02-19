import React from "react";
import styled from "styled-components";

import { EStyles } from "constants/Styling.constants";
import { ItemsList } from "components/Utils/ItemsList";
import { LMNLogo } from "components/Utils/LMNLogo";
import { FullHeightContainer } from "components/Utils/FullHeightContainer";
import { InputAndButton } from "components/Utils/InputAndButton";
import { usePlayerJoinGame } from "hooks/game/usePlayerJoinGame.hook";
import { Game } from "models/Game.model";
import { EUserType } from "constants/GameUserType.constants";

interface JoinGamePreparationProps {
  game: Game;
  userType: EUserType;
}

export const JoinGamePreparation: React.FC<JoinGamePreparationProps> = ({
  game,
  userType,
}): JSX.Element => {
  const { handlePlayerJoinGame } = usePlayerJoinGame({ shortId: game.shortId });

  return (
    <FullHeightContainer className="d-flex flex-column align-center">
      <LMNLogo width="400px" margin={`20px 0 20px 0`} />
      <div className="d-flex flex-column align-center space-around flex-grow">
        <GameName>{game.name.toUpperCase()}</GameName>
        {userType === "join" && (
          <InputAndButton
            handleSubmit={async (value) =>
              await handlePlayerJoinGame({ name: value })
            }
            buttonLabel="Rejoindre la partie"
            placeholder="My lovely name"
            margin={`0 0 20px 0`}
          />
        )}
        <div>
          {game.players.length > 0 && (
            <>
              <PlayersTitle>Dans les starting blocks</PlayersTitle>
              <ItemsList
                list={game.players.map((playerData) => playerData.player)}
                labelKey="name"
                className="d-flex justify-center flex-wrap"
                maxWidth="600px"
                margin={`0 0 40px 0`}
              />
            </>
          )}
        </div>
      </div>
    </FullHeightContainer>
  );
};

const GameName = styled.h1`
  color: ${EStyles.yellow};
  text-shadow: 3px 3px 0 ${EStyles.redOrange};
  text-align: center;
  margin-bottom: 20px;
`;
const PlayersTitle = styled.h2`
  color: ${EStyles.redOrange};
  text-shadow: 3px 3px 0 ${EStyles.blue};
  text-align: center;
  margin-bottom: 10px;
`;
