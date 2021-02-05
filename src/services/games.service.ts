import { DocumentNode, gql } from "@apollo/client";

// QUERIES

export const GET_GAME: DocumentNode = gql`
  query Game($shortId: String!) {
    game(shortId: $shortId) {
      _id
      shortId
      name
      stage
      players {
        _id
        name
      }
      currentPlayers {
        _id
        name
      }
      currentQuizItem {
        quizId
        level
        quizItemId
      }
      createdAt
    }
  }
`;

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
    $currentQuizItem: CurrentQuizItemInput!
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
      _id
      shortId
      name
      stage
      players {
        _id
        name
      }
      currentPlayers {
        _id
        name
      }
      currentQuizItem {
        quizId
        level
        quizItemId
      }
    }
  }
`;

export const GAME_CURRENT_QUIZ_ITEM_UPDATED: DocumentNode = gql`
  subscription OnGameCurrentQuizItemUpdated($shortId: String!) {
    gameCurrentQuizItemUpdated(shortId: $shortId) {
      _id
      shortId
      name
      stage
      players {
        _id
        name
      }
      currentPlayers {
        _id
        name
      }
      currentQuizItem {
        quizId
        level
        quizItemId
      }
    }
  }
`;

export const PLAYER_ANSWERED: DocumentNode = gql`
  subscription OnPlayerAnswered($shortId: String!) {
    playerAnswered(shortId: $shortId) {
      playerId
      answer
    }
  }
`;
