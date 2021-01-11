import React from "react";
import { useQuery } from "@apollo/client";
import io from "socket.io-client";
import styled from "styled-components";

import { GET_GAMES } from "../service/games";
import { Game } from "../models/Game";
import { Link } from "react-router-dom";
import AddTodo from "../components/Home/AddTodo";

const Home: React.FC<{}> = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_GAMES);

  // React.useEffect(() => {
  //   const socket = io("http://localhost:4000/");
  //   socket.on("connect", () => {
  //     console.log(socket.id);
  //   });
  // }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <HomeContainer className="d-flex flex-column align-center justify-center">
      <AddTodo />
      <ul>
        {data.getGames.map((game: Game) => (
          <li key={game._id}>
            <Link to={`/game/${game._id}`}>{game.name} </Link>
          </li>
        ))}
      </ul>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;
