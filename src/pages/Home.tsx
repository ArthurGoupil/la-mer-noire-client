import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import { GET_GAMES, GAME_CREATED_SUBSCRIPTION } from "../service/games";
import { Link, useHistory } from "react-router-dom";
import FullContainer from "../components/Utils/FullContainer";
import Button from "../components/Utils/Button";
import { smallSpace } from "../styles/StylingVariables";
import ItemsList from "../components/Utils/ItemsList";
import LMNLogo from "../components/Utils/LMNLogo";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <FullContainer className="d-flex flex-column align-center justify-center">
      <LMNLogo width="500px" margin="0 0 40px 0" />
      {data.getGames.length > 0 ? (
        <>
          <JoinGameTitle>Rejoindre une partie</JoinGameTitle>
          <ItemsList
            list={data.getGames}
            labelKey="name"
            linkBase="/games"
            linkParamKey="_id"
            margin={`0 0 ${smallSpace} 0`}
          />
          <CreateGameWrapper>
            <Link to="/create">Créer une partie</Link>
          </CreateGameWrapper>
        </>
      ) : (
        <Button
          label="Créer une partie"
          onClick={() => history.push("/create")}
          margin={`0 0 ${smallSpace} 0`}
        />
      )}
    </FullContainer>
  );
};

const JoinGameTitle = styled.h1`
  font-size: 30px;
`;

const CreateGameWrapper = styled.div`
  font-size: 14px;
  line-height: 14px;
`;

export default Home;
