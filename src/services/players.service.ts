import { DocumentNode, gql } from "@apollo/client";

// MUTATIONS

export const CREATE_PLAYER: DocumentNode = gql`
  mutation CreatePlayer($name: String!) {
    createPlayer(name: $name) {
      _id
      name
    }
  }
`;
