import React from "react";
import styled from "styled-components";

import { Link, useHistory } from "react-router-dom";
import FullHeightContainer from "components/Utils/FullHeightContainer";
import LMNLogo from "components/Utils/LMNLogo";
import InputAndButton from "components/Utils/InputAndButton";
import AnimatedSubmarine from "components/Utils/AnimatedSubmarine";

interface HandleJoinGameProps {
  shortId: string;
}

const Home: React.FC = (): JSX.Element => {
  const history = useHistory();

  const handleJoinGame = ({ shortId }: HandleJoinGameProps): void => {
    history.push(`/games/${shortId.toUpperCase()}/join`);
  };

  return (
    <FullHeightContainer className="d-flex flex-column align-center justify-center">
      <audio autoPlay loop src="/LMN-Home.mp3" />
      <LMNLogo width="500px" margin={`0 0 20px 0`} />
      <InputAndButton
        handleSubmit={(value) => handleJoinGame({ shortId: value })}
        buttonLabel="Rejoindre la partie"
        inputWidth={130}
        margin={`0 0 20px 0`}
        placeholder="52E5E"
      />
      <CreateGameWrapper>
        <Link to="/create">Créer une partie</Link>
      </CreateGameWrapper>
      <AnimatedSubmarine />
    </FullHeightContainer>
  );
};

const CreateGameWrapper = styled.div`
  font-size: 14px;
  line-height: 14px;
`;

export default Home;
