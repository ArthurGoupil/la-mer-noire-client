import React from "react";
import styled from "styled-components";

import { Link, useHistory } from "react-router-dom";
import FullContainer from "components/Utils/FullContainer";
import LMNLogo from "components/Utils/LMNLogo";
import InputAndButton from "components/Utils/InputAndButton";
import AnimatedSubmarine from "components/Utils/AnimatedSubmarine";
import { setGameCookie } from "utils/cookies.utils";
import { ECookieName } from "constants/Cookies.constants";
import { EGameStage } from "constants/GameCurrentState.constants";

const Home: React.FC<{}> = (): JSX.Element => {
  const history = useHistory();

  const handleJoinGame = (shortId: string) => {
    setGameCookie({
      prefix: shortId,
      cookieName: ECookieName.stage,
      cookieValue: EGameStage.playersRegistration,
    });
    history.push(`/games/${shortId.toUpperCase()}/join`);
  };

  return (
    <FullContainer className="d-flex flex-column align-center justify-center">
      <LMNLogo width="500px" margin={`0 0 20px 0`} />
      <InputAndButton
        handleSubmit={handleJoinGame}
        buttonLabel="Rejoindre la partie"
        inputWidth={130}
        margin={`0 0 20px 0`}
        placeholder="52E5E"
      />
      <CreateGameWrapper>
        <Link to="/create">Créer une partie</Link>
      </CreateGameWrapper>
      <AnimatedSubmarine />
    </FullContainer>
  );
};

const CreateGameWrapper = styled.div`
  color: white;
  font-size: 14px;
  line-height: 14px;
`;

export default Home;
