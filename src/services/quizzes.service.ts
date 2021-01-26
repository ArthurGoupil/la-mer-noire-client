import { DocumentNode, gql } from "@apollo/client";

export const GET_RANDOM_QUIZ: DocumentNode = gql`
  query GetRandomQuiz {
    getRandomQuiz {
      _id
      category {
        name
      }
      theme
      subTheme
      difficulty
      quizItems {
        beginner {
          question
          choices
          answer
          anecdote
        }
        intermediate {
          question
          choices
          answer
          anecdote
        }
        expert {
          question
          choices
          answer
          anecdote
        }
      }
    }
  }
`;
