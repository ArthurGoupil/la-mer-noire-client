import { DocumentNode, gql } from "@apollo/client";

const currentState = `
  currentState {
    stage
    question {
      quiz {
        category { name }
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
      level
      itemId
    }
    playersTurn {
      _id
      name
    }
  }
`;

export const GET_GAMES: DocumentNode = gql`
  query GetGames {
    getGames {
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

export const GET_GAME: DocumentNode = gql`
  query GetGame($shortId: String!) {
    getGame(shortId: $shortId) {
      _id
      shortId
      name
      players {
        _id
        name
      }
      ${currentState}
      createdAt
    }
  }
`;

export const CREATE_GAME: DocumentNode = gql`
  mutation CreateGame($name: String!) {
    createGame(name: $name) {
      _id
      shortId
      name
      players {
        _id
        name
      }
      ${currentState}
      createdAt
    }
  }
`;

export const ADD_PLAYER_TO_GAME: DocumentNode = gql`
  mutation AddPlayerToGame($playerId: ID!, $shortId: String!) {
    addPlayerToGame(playerId: $playerId, shortId: $shortId) {
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

export const UPDATE_GAME_CURRENT_STATE: DocumentNode = gql`
  mutation UpdateGameCurrentState(
    $currentState: CurrentStateInput!
    $shortId: String!
  ) {
    updateGameCurrentState(currentState: $currentState, shortId: $shortId) {
      _id
      shortId
      name
      createdAt
    }
  }
`;

export const GAME_CREATED_SUBSCRIPTION: DocumentNode = gql`
  subscription OnGameCreated {
    gameCreated {
      _id
      shortId
      name
      createdAt
    }
  }
`;

export const GAME_PLAYERS_CHANGED_SUBSCRIPTION: DocumentNode = gql`
  subscription OnPlayerAdded($shortId: String!) {
    gamePlayersChanged(shortId: $shortId) {
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

export const GAME_CURRENT_STATE_SUBSCRIPTION: DocumentNode = gql`
  subscription OnCurrentStateChanged($shortId: String!) {
    gameCurrentStateChanged(shortId: $shortId) {
      _id
      shortId
      name
      players {
        _id
        name
      }
      ${currentState} 
      createdAt
    }
  }
`;
