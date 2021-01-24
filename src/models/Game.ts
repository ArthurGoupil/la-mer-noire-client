import React from "react";

export interface CurrentState {
  type: string;
  _id: string;
}
export interface Game {
  _id: string;
  shortId: string;
  name: string;
  players: Record<string, React.ReactNode>[];
  currentState: CurrentState;
  createdAt: string;
  updatedAd?: string;
}
