import {
  ECaPasseOuCaCashStatesBottomScreensStateNames,
  ECaPasseOuCaCashStatesTopScreensStatesNames,
} from "constants/CaPasseOuCaCash.constants";
import { EGameStage } from "constants/GameStage.constants";
import { Player } from "models/Player.model";
import { QuestionNumber } from "utils/quiz/getLevelByQuestionNumber.util";
import { QuizItemId, QuizLevel } from "./Quiz.model";

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
  level: QuizLevel;
  quizItemId: QuizItemId;
}

export interface Answer {
  quizItemSignature: string;
  answer: string;
  answerType: AnswerType;
}

export enum AnswerType {
  duo = "duo",
  carre = "carre",
  cash = "cash",
}

export interface AnswerTypeChoice {
  quizItemSignature: string;
  answerType: AnswerType;
}

export type PlayerPoints = { previous: number; current: number };
export type PlayersPoints = Record<string, PlayerPoints>;

export interface CaPasseOuCaCashState {
  stateName:
    | keyof typeof ECaPasseOuCaCashStatesBottomScreensStateNames
    | keyof typeof ECaPasseOuCaCashStatesTopScreensStatesNames;
  quizLevel: QuizLevel;
  questionNumber: QuestionNumber;
  playersPoints: PlayersPoints;
}

export interface QuestionRecord {
  isDone: boolean;
  timestamp: number | null;
}
