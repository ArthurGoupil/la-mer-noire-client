import { DocumentNode, gql, useLazyQuery, useQuery } from "@apollo/client";

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
    refetch: quizRefetch,
    loading: quizLoading,
    error: quizError,
    data: quizData,
  } = useQuery(GET_QUIZ, {
    variables: { id: quizId },
  });

  return { quizRefetch, quizLoading, quizError, quizData };
};

export const GET_RANDOM_QUIZ_ID: DocumentNode = gql`
  query RandomQuizId {
    randomQuizId
  }
`;
export const getLazyRandomQuizId = () => {
  const [
    triggerGetRandomQuiz,
    {
      data: randomQuizIdData,
      loading: randomQuizIdLoading,
      error: randomQuizIdError,
      refetch: randomQuizIdRefetch,
      called: randomQuizIdCalled,
    },
  ] = useLazyQuery(GET_RANDOM_QUIZ_ID, {
    fetchPolicy: "network-only",
  });

  return {
    triggerGetRandomQuiz,
    randomQuizIdData,
    randomQuizIdLoading,
    randomQuizIdError,
    randomQuizIdRefetch,
    randomQuizIdCalled,
  };
};
