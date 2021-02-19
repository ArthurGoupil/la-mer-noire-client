import { EGameStage } from "constants/GameStage.constants";
import { Player } from "models/Player.model";
import { QuizItemId, QuizItemLevel } from "./Quiz.model";

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
  createdAtTimestamp: number;
}

export interface Answer {
  quizId: string;
  answer: string;
  answerType: AnswerType;
}

export enum AnswerType {
  duo = "duo",
  carre = "carre",
  cash = "cash",
}

export interface AnswerTypeChoice {
  quizId: string;
  answerType: AnswerType;
}

export interface CaPasseOuCaCashState {
  questionNumber: number;
  playersPoints: Record<string, number>;
}
