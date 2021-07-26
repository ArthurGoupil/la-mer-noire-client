import { DocumentNode, gql } from "@apollo/client";

// QUERIES

export const GET_QUIZ_ITEM_DATA: DocumentNode = gql`
  query QuizItemData($quizId: ID!, $level: String!, $quizItemId: Int!) {
    quizItemData(quizItemSignature: { quizId: $quizId, level: $level, quizItemId: $quizItemId }) {
      quizItemSignature
      category {
        _id
        name
      }
      theme
      subTheme
      level
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

export const GET_QUIZZES_ITEMS_DATA: DocumentNode = gql`
  query QuizzesItemsData($quizItemsSignatures: [QuizItemSignatureInput]) {
    quizzesItemsData(quizItemsSignatures: $quizItemsSignatures) {
      quizItemSignature
      category {
        _id
        name
      }
      theme
      subTheme
      level
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
