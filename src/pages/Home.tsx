import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import { GET_GAMES, GAME_CREATED_SUBSCRIPTION } from "../service/games";
import { Link, useHistory } from "react-router-dom";
import FullContainer from "../components/Utils/FullContainer";
import { smallSpace } from "../styles/StylingVariables";
import LMNLogo from "../components/Utils/LMNLogo";
import InputAndButton from "../components/Utils/InputAndButton";
import AnimatedSubmarine from "../components/Utils/AnimatedSubmarine";
import Loader from "../components/Utils/Loader";

const Home: React.FC<{}> = (): JSX.Element => {
  const history = useHistory();
  const { subscribeToMore, loading, error, data } = useQuery(GET_GAMES);

  React.useEffect(() => {
    subscribeToMore({
      document: GAME_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.gameCreated;
        return { getGames: [...prev.getGames, newFeedItem] };
      },
    });
  }, [subscribeToMore]);

  const handleJoinGame = (shortId: string) => {
    history.push(`/games/${shortId.toUpperCase()}`);
  };

  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <FullContainer className="d-flex flex-column align-center justify-center">
      {!loading ? (
        <>
          <LMNLogo width="500px" margin={`0 0 ${smallSpace} 0`} />
          <InputAndButton
            handleSubmit={handleJoinGame}
            buttonLabel="Rejoindre la partie"
            inputWidth={130}
            margin={`0 0 ${smallSpace} 0`}
            placeholder="52E5E"
          />
          <CreateGameWrapper>
            <Link to="/create">Créer une partie</Link>
          </CreateGameWrapper>
          <AnimatedSubmarine />
        </>
      ) : (
        <Loader containerHeight="100vh" />
      )}
    </FullContainer>
  );
};

const CreateGameWrapper = styled.div`
  color: white;
  font-size: 14px;
  line-height: 14px;
`;

export default Home;
