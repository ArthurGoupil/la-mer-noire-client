import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export const GET_TIMESTAMP: DocumentNode = gql`
  query Timestamp {
    timestamp
  }
`;
