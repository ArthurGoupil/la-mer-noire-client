import { Player } from "./Player";
export interface Game {
  _id: string;
  shortId: string;
  name: string;
  players: Player[];
  createdAt: string;
  updatedAd?: string;
}

export interface CurrentQuizItem {
  quizId: string;
  level: string;
  quizItemId: number;
}

export interface CurrentAnswer {
  quizId: string;
  answer: string;
}
