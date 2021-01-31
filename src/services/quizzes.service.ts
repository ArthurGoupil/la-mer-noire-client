import { DocumentNode, gql, useQuery } from "@apollo/client";

interface QuizId {
  quizId: string;
}

// QUERIES

const GET_QUIZ: DocumentNode = gql`
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
          _id
          question
          choices
          answer
          anecdote
        }
        intermediate {
          _id
          question
          choices
          answer
          anecdote
        }
        expert {
          _id
          question
          choices
          answer
          anecdote
        }
      }
    }
  }
`;
export const getQuiz = ({ quizId }: QuizId) => {
  const {
    refetch,
    loading: quizLoading,
    error: quizError,
    data: quizData,
  } = useQuery(GET_QUIZ, {
    variables: { id: quizId },
  });

  return { refetch, quizLoading, quizError, quizData };
};

export const GET_RANDOM_QUIZ_ID: DocumentNode = gql`
  query RandomQuizId {
    randomQuizId
  }
`;
