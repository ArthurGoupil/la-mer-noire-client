import { DocumentNode, gql, useQuery, useSubscription } from "@apollo/client";

interface ShortId {
  shortId: string;
}

// QUERIES

const GET_GAME: DocumentNode = gql`
  query Game($shortId: String!) {
    game(shortId: $shortId) {
      _id
      shortId
      name
      players {
        _id
        name
      }
      createdAt
    }
  }
`;
export const getGame = ({ shortId }: ShortId) => {
  const {
    subscribeToMore,
    loading: gameLoading,
    error: gameError,
    data: gameData,
  } = useQuery(GET_GAME, {
    variables: { shortId },
  });

  return { subscribeToMore, gameLoading, gameError, gameData };
};

// MUTATIONS

export const CREATE_GAME: DocumentNode = gql`
  mutation CreateGame($name: String!) {
    createGame(name: $name) {
      _id
      shortId
    }
  }
`;

export const ADD_PLAYER_TO_GAME: DocumentNode = gql`
  mutation AddPlayerToGame($shortId: String!, $playerId: ID!) {
    addPlayerToGame(shortId: $shortId, playerId: $playerId)
  }
`;

export const UPDATE_GAME_STAGE: DocumentNode = gql`
  mutation UpdateGameStage($shortId: String!, $stage: String!) {
    updateGameStage(shortId: $shortId, stage: $stage)
  }
`;

export const UPDATE_GAME_CURRENT_QUIZ_ITEM: DocumentNode = gql`
  mutation UpdateGameCurrentQuizItem(
    $shortId: String!
    $currentQuizItem: CurrentQuizItem!
  ) {
    updateGameCurrentQuizItem(
      shortId: $shortId
      currentQuizItem: $currentQuizItem
    )
  }
`;

export const GIVE_ANSWER: DocumentNode = gql`
  mutation GiveAnswer($shortId: String!, $playerId: ID!, $answer: String!) {
    giveAnswer(shortId: $shortId, playerId: $playerId, answer: $answer)
  }
`;

// SUBSCRIPTIONS

export const GAME_PLAYERS_UPDATED: DocumentNode = gql`
  subscription OnGamePlayersUpdated($shortId: String!) {
    gamePlayersUpdated(shortId: $shortId) {
      _id
      shortId
      name
      players {
        _id
        name
      }
      createdAt
    }
  }
`;

export const GAME_STAGE_UPDATED: DocumentNode = gql`
  subscription OnGameStageUpdated($shortId: String!) {
    gameStageUpdated(shortId: $shortId) {
      stage
    }
  }
`;

export const GAME_CURRENT_QUIZ_ITEM_UPDATED: DocumentNode = gql`
  subscription OnGameCurrentQuizItemUpdated($shortId: String!) {
    gameCurrentQuizItemUpdated(shortId: $shortId) {
      quizId
      level
      quizItemId
    }
  }
`;
export const subscribeToCurrentQuizItemUpdated = ({ shortId }: ShortId) => {
  const { data: currentQuizItemUpdatedData } = useSubscription(
    GAME_CURRENT_QUIZ_ITEM_UPDATED,
    {
      variables: { shortId },
    },
  );

  return currentQuizItemUpdatedData;
};

export const PLAYER_ANSWERED: DocumentNode = gql`
  subscription OnPlayerAnswered($shortId: String!) {
    playerAnswered(shortId: $shortId) {
      playerId
      answer
    }
  }
`;
export const subscribeToPlayerAnswered = ({ shortId }: ShortId) => {
  const { data: answerData } = useSubscription(PLAYER_ANSWERED, {
    variables: { shortId },
  });

  return answerData;
};
