import { DocumentNode, gql } from "@apollo/client";

export const GET_GAMES: DocumentNode = gql`
  query GetGames {
    getGames {
      _id
      name
    }
  }
`;

export const ADD_GAME: DocumentNode = gql`
  mutation AddGame($name: String!) {
    addGame(name: $name) {
      _id
      name
      createdAt
    }
  }
`;
