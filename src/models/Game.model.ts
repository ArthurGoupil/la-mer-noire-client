import { AnswerType } from "constants/AnswerType.constants";
import {
  CaPasseOuCaCashBottomScreensStates,
  CaPasseOuCaCashTopScreensStates,
} from "constants/CaPasseOuCaCash.constants";
import { GameStage } from "constants/GameStage.constants";
import {
  KidimieuxBottomScreensStates,
  KidimieuxTopScreensStates,
} from "constants/Kidimieux.constants";
import {
  ScubadoobidooBottomScreensStates,
  ScubadoobidooTopScreensStates,
} from "constants/Scubadoobidoo.constants";
import { Player } from "models/Player.model";
import { QuizItemId, QuizLevel, QuizItemSignature } from "./Quiz.model";

export interface Game {
  _id: string;
  shortId: string;
  name: string;
  stage: GameStage;
  players: PlayerData[];
  scubadoobidooQuizItemSignatures: QuizItemSignature[];
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
  currentPlayers: string[];
  playersCanAnswer: boolean;
  playersCanBuzz: boolean;
}

export interface CurrentAnswer {
  quizItemSignature: string;
  answer: string;
  answerType: AnswerType;
}

export interface Answer extends CurrentAnswer {
  isGoodAnswer: boolean;
  isFirstGoodCash: boolean;
}

export interface Buzz {
  quizItemSignature: string;
  answer: string;
}

export interface AnswerTypeChoice {
  quizItemSignature: string;
  answerType: AnswerType;
}

export type PlayerPoints = { previous: number; current: number };
export type PlayersPoints = Record<string, PlayerPoints>;

export interface CaPasseOuCaCashMaster {
  state:
    | keyof typeof CaPasseOuCaCashBottomScreensStates
    | keyof typeof CaPasseOuCaCashTopScreensStates;
  quizLevel: QuizLevel;
  questionNumber: number;
  playersPoints: PlayersPoints;
}

export interface KidimieuxMaster {
  state: keyof typeof KidimieuxBottomScreensStates | keyof typeof KidimieuxTopScreensStates;
  quizLevel: QuizLevel;
  questionNumber: number;
  playersPoints: PlayersPoints;
  currentAnswerType: AnswerType | null;
}

export type ScubadoobidooState =
  | keyof typeof ScubadoobidooBottomScreensStates
  | keyof typeof ScubadoobidooTopScreensStates;

export interface QuestionRecord {
  isDone: boolean;
  timestamp: number | null;
  buzzIsDone: boolean;
  buzzTimestamp: number | null;
}

export interface PlayerAnswersSummary {
  answers: number;
  goodAnswers: number;
  answersFactor: number;
  doneQuizItemSignatures: string[];
}
