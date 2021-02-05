import { EGameStage } from "constants/GameCurrentState.constants";
import { Player } from "models/Player";

export interface Game {
  _id: string;
  shortId: string;
  name: string;
  stage: EGameStage;
  players: Player[];
  currentPlayers: Player[];
  currentQuizItem: CurrentQuizItem;
  createdAt: string;
  updatedAd?: string;
}

export interface CurrentQuizItem {
  quizId: string;
  level: "beginner" | "intermediate" | "expert";
  quizItemId: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export interface Answer {
  quizId: string;
  answer: string;
}
