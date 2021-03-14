import { AnswerType } from "constants/AnswerType.constants";
import {
  CaPasseOuCaCashBottomScreensStates,
  CaPasseOuCaCashTopScreensStates,
} from "constants/CaPasseOuCaCash.constants";
import { GameStage } from "constants/GameStage.constants";
import { Player } from "models/Player.model";
import { QuestionNumber } from "utils/quiz/getQuizLevelByQuestionNumber.util";
import { QuizItemId, QuizLevel } from "./Quiz.model";

export interface Game {
  _id: string;
  shortId: string;
  name: string;
  stage: GameStage;
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

export interface CurrentAnswer {
  quizItemSignature: string;
  answer: string;
  answerType: AnswerType;
}

export interface Answer extends CurrentAnswer {
  isGoodAnswer: boolean;
  isFirstGoodCash: boolean;
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
  questionNumber: QuestionNumber;
  playersPoints: PlayersPoints;
}

export interface QuestionRecord {
  isDone: boolean;
  timestamp: number | null;
}
