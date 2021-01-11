import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import "./styles/reset.css";
import "./styles/index.css";
import Home from "./pages/Home";
import Game from "./pages/Game";

const App: React.FC<{}> = (): JSX.Element => {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Main>
          <Switch>
            <Route path="/game/:id">
              <Game />
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
`;
