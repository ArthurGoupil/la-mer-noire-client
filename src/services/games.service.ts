import { DocumentNode, gql } from "@apollo/client";

const gameData = `
  _id
  shortId
  name
  stage
  players {
    player {
      _id
      name
    }
    points
  }
  currentQuizItem {
    quizId
    level
    quizItemId
    currentPlayers
    playersCanAnswer
    playersCanBuzz
  }
  createdAt
`;

// QUERIES

export const GET_GAME: DocumentNode = gql`
  query Game($shortId: String!) {
    game(shortId: $shortId) {
      ${gameData}
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
  mutation AddPlayerToGame($shortId: String!, $name: String!) {
    addPlayerToGame(shortId: $shortId, name: $name)
  }
`;

export const UPDATE_GAME_STAGE: DocumentNode = gql`
  mutation UpdateGameStage($shortId: String!, $stage: String!) {
    updateGameStage(shortId: $shortId, stage: $stage)
  }
`;

export const GIVE_ANSWER: DocumentNode = gql`
  mutation GiveAnswer(
    $shortId: String!
    $playerId: ID!
    $quizItemSignature: String!
    $answer: String!
    $answerType: String!
  ) {
    giveAnswer(
      shortId: $shortId
      playerId: $playerId
      quizItemSignature: $quizItemSignature
      answer: $answer
      answerType: $answerType
    )
  }
`;

export const GENERATE_NEW_CURRENT_QUIZ_ITEM: DocumentNode = gql`
  mutation GenerateNewCurrentQuizItem($shortId: String!, $level: String!) {
    generateNewCurrentQuizItem(shortId: $shortId, level: $level)
  }
`;

export const UPDATE_PLAYERS_CAN_ANSWER: DocumentNode = gql`
  mutation UpdatePlayersCanAnswer($shortId: String!, $playersCanAnswer: Boolean!) {
    updatePlayersCanAnswer(shortId: $shortId, playersCanAnswer: $playersCanAnswer)
  }
`;

export const UPDATE_PLAYERS_CAN_BUZZ: DocumentNode = gql`
  mutation UpdatePlayersCanBuzz($shortId: String!, $playersCanBuzz: Boolean!) {
    updatePlayersCanBuzz(shortId: $shortId, playersCanBuzz: $playersCanBuzz)
  }
`;

export const UPDATE_CURRENT_PLAYERS: DocumentNode = gql`
  mutation UpdateCurrentPlayers($shortId: String!, $currentPlayers: [ID]!) {
    updateCurrentPlayers(shortId: $shortId, currentPlayers: $currentPlayers)
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
        player {
          _id
          name
        }
      }
      createdAt
    }
  }
`;

export const GAME_STAGE_UPDATED: DocumentNode = gql`
  subscription OnGameStageUpdated($shortId: String!) {
    gameStageUpdated(shortId: $shortId) {
    ${gameData}
    }
  }
`;

export const PLAYER_ANSWERED: DocumentNode = gql`
  subscription OnPlayerAnswered($shortId: String!) {
    playerAnswered(shortId: $shortId) {
      playerId
      quizItemSignature
      answer
      answerType
    }
  }
`;

export const CURRENT_QUIZ_ITEM_UPDATED: DocumentNode = gql`
  subscription CurrentQuizItemUpdated($shortId: String!) {
    currentQuizItemUpdated(shortId: $shortId) {
      ${gameData}
    }
  }
`;
