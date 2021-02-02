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
  } = useQuery(GET_QUIZ, { variables: { id: quizId } });

  return { quizRefetch, quizLoading, quizError, quizData };
};
export const getLazyQuiz = ({ quizId }: QuizId) => {
  const [
    triggerGetQuiz,
    {
      data: quizData,
      loading: quizLoading,
      error: quizError,
      refetch: quizRefetch,
    },
  ] = useLazyQuery(GET_QUIZ, { variables: { id: quizId } });

  return {
    triggerGetQuiz,
    quizData,
    quizLoading,
    quizError,
    quizRefetch,
  };
};

export const GET_RANDOM_QUIZ_ID: DocumentNode = gql`
  query RandomQuizId {
    randomQuizId
  }
`;
export const getRandomQuizId = () => {
  const {
    refetch: quizIdRefetch,
    loading: quizIdLoading,
    error: quizIdError,
    data: quizIdData,
  } = useQuery(GET_RANDOM_QUIZ_ID);

  return { quizIdRefetch, quizIdLoading, quizIdError, quizIdData };
};
export const getLazyRandomQuizId = () => {
  const [
    triggerGetRandomQuizId,
    {
      data: randomQuizIdData,
      loading: randomQuizIdLoading,
      error: randomQuizIdError,
      refetch: randomQuizIdRefetch,
    },
  ] = useLazyQuery(GET_RANDOM_QUIZ_ID, {
    fetchPolicy: "network-only",
  });

  return {
    triggerGetRandomQuizId,
    randomQuizIdData,
    randomQuizIdLoading,
    randomQuizIdError,
    randomQuizIdRefetch,
  };
};
