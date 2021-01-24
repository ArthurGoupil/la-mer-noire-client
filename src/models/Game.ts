import { Player } from "./Player";
import { Quiz } from "./Quiz";

export interface CurrentState {
  stage: string;
  question: {
    quiz: Quiz;
    level: string;
    itemId: number;
  };
  playersTurn: Player[];
}
export interface Game {
  _id: string;
  shortId: string;
  name: string;
  players: Player[];
  currentState: CurrentState;
  createdAt: string;
  updatedAd?: string;
}
