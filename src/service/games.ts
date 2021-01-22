import { DocumentNode, gql } from "@apollo/client";

export const GET_GAMES: DocumentNode = gql`
  query GetGames {
    getGames {
      _id
      shortId
      name
      players {
        _id
        name
      }
      createdAt
    }
  }
`;

export const GET_GAME: DocumentNode = gql`
  query GetGame($shortId: String!) {
    getGame(shortId: $shortId) {
      _id
      shortId
      name
      players {
        _id
        name
      }
      createdAt
    }
  }
`;

export const CREATE_GAME: DocumentNode = gql`
  mutation CreateGame($name: String!) {
    createGame(name: $name) {
      _id
      shortId
      name
      players {
        _id
        name
      }
      createdAt
    }
  }
`;

export const ADD_PLAYER_TO_GAME: DocumentNode = gql`
  mutation AddPlayerToGame($playerId: ID!, $shortId: String!) {
    addPlayerToGame(playerId: $playerId, shortId: $shortId) {
      _id
      shortId
      name
      players {
        _id
        name
      }
      createdAt
    }
  }
`;

export const GAME_CREATED_SUBSCRIPTION: DocumentNode = gql`
  subscription OnGameCreated {
    gameCreated {
      _id
      shortId
      name
      players {
        _id
        name
      }
      createdAt
    }
  }
`;

export const GAME_PLAYERS_CHANGED_SUBSCRIPTION: DocumentNode = gql`
  subscription OnPlayerAdded($shortId: String!) {
    gamePlayersChanged(shortId: $shortId) {
      _id
      shortId
      name
      players {
        _id
        name
      }
      createdAt
    }
  }
`;
