import { DocumentNode, gql } from "@apollo/client";

// QUERIES

export const GET_QUIZ: DocumentNode = gql`
  query Quiz($id: ID!) {
    quiz(id: $id) {
      _id
      category {
        name
      }
      theme
      subTheme
      difficulty
      quizItems {
        beginner {
          quizItemId
          question
          choices
          answer
          anecdote
        }
        intermediate {
          quizItemId
          question
          choices
          answer
          anecdote
        }
        expert {
          quizItemId
          question
          choices
          answer
          anecdote
        }
      }
    }
  }
`;

export const GET_RANDOM_QUIZ_ID: DocumentNode = gql`
  query RandomQuizId {
    randomQuizId
  }
`;
