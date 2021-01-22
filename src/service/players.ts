import { DocumentNode, gql } from "@apollo/client";

export const GET_PLAYER: DocumentNode = gql`
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      _id
      name
    }
  }
`;

export const CREATE_PLAYER: DocumentNode = gql`
  mutation CreatePlayer($name: String!) {
    createPlayer(name: $name) {
      _id
      name
    }
  }
`;
