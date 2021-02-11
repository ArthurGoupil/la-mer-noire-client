import React from "react";
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import "constants/Styling.constants.ts";
import "styles/reset.css";
import "styles/index.css";
import EStyles from "constants/Styling.constants";
import Home from "containers/Home.container";
import Game from "containers/Game/Game.container";
import CreateGame from "containers/Game/CreateGame.container";
import useWindowHeight from "hooks/useWindowHeight.hook";
import ToggleFullScreen from "components/Utils/ToggleFullScreen";
import isDesktop from "utils/isDesktop.util";

const App: React.FC = (): JSX.Element => {
  const height = useWindowHeight();

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
  });

  const wsServer =
    process.env.NODE_ENV !== "development"
      ? "ws://localhost:4000/graphql"
      : "wss://la-mer-noire-server.herokuapp.com/graphql";

  const wsLink = new WebSocketLink({
    uri: wsServer,
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
        <Main height={height}>
          {isDesktop() && <ToggleFullScreen />}
          <Switch>
            <Route path="/games/:shortId/:userType">
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

const Main = styled.main<{ height: number }>`
  width: 100%;
  min-height: ${(props) => props.height}px;
  background: linear-gradient(
    to bottom,
    ${EStyles.blue} 0%,
    ${EStyles.darkBlue} 100%
  );
`;
