import { DocumentNode, gql } from "@apollo/client";

export const GET_GAMES: DocumentNode = gql`
  query GetGames {
    getGames {
      _id
      name
    }
  }
`;

export const CREATE_GAME: DocumentNode = gql`
  mutation CreateGame($name: String!) {
    createGame(name: $name) {
      _id
      name
      createdAt
    }
  }
`;
