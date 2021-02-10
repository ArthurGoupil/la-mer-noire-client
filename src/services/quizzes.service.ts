import { DocumentNode, gql } from "@apollo/client";

// QUERIES

export const GET_QUIZ_ITEM_DATA: DocumentNode = gql`
  query QuizItemData(
    $quizId: ID!
    $level: String!
    $quizItemId: Int!
    $createdAtTimestamp: Int!
  ) {
    quizItemData(
      quizId: $quizId
      level: $level
      quizItemId: $quizItemId
      createdAtTimestamp: $createdAtTimestamp
    ) {
      quizId
      category {
        _id
        name
      }
      theme
      subTheme
      createdAtTimestamp
      quiz {
        quizItemId
        question
        choices
        answer
        anecdote
      }
    }
  }
`;
