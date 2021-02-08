import EGameStage from "constants/GameStage.constants";
import { Player } from "models/Player";

export interface Game {
  _id: string;
  shortId: string;
  name: string;
  stage: EGameStage;
  players: [PlayerData];
  currentPlayers: Player[];
  currentQuizItem: CurrentQuizItem;
  createdAt: string;
  updatedAd?: string;
}

export interface PlayerData {
  player: Player;
  points: number;
}

export interface CurrentQuizItem {
  quizId: string;
  level: QuizItemLevel;
  quizItemId: QuizItemId;
}
export type QuizItemId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type QuizItemLevel = "beginner" | "intermediate" | "expert";

export interface Answer {
  quizId: string;
  answer: string;
}
