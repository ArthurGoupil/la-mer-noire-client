import React from "react";
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import "./styles/reset.css";
import "./styles/index.css";
import Home from "./pages/Home";
import Game from "./pages/Game";
import CreateGame from "./pages/CreateGame";
import { mainBlue, mainDarkBlue } from "./styles/StylingVariables";

const App: React.FC<{}> = (): JSX.Element => {
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
  });

  const wsLink = new WebSocketLink({
    // uri: "ws://localhost:4000/graphql",
    uri: "wss://la-mer-noire-server.herokuapp.com/graphql",
    options: {
      reconnect: true,
    },
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink,
  );

  const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Main>
          <Switch>
            <Route path="/games/:shortId">
              <Game />
            </Route>
            <Route path="/create">
              <CreateGame />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Main>
      </Router>
    </ApolloProvider>
  );
};

export default App;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, ${mainBlue} 0%, ${mainDarkBlue} 100%);
`;
