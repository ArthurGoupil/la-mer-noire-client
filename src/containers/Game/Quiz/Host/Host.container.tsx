import React from "react";
import { useQuery } from "@apollo/client";

import { Game } from "models/Game.model";
import { GET_QUIZ_ITEM_DATA } from "services/quizzes.service";
import { CaPasseOuCaCashContainer } from "./CaPasseOuCaCash.container";
import { QuizStage } from "constants/GameStage.constants";
import { QuizItemId, QuizLevel } from "models/Quiz.model";
import { Kidimieux } from "./Kidimieux.container";

interface HostProps {
  game: Game;
}

export interface GenerateNewQuizItemDataProps {
  QuizLevel: QuizLevel;
  quizItemId: QuizItemId;
}

export const HostContainer: React.FC<HostProps> = ({ game }): JSX.Element => {
  const { stage, currentQuizItem } = game;
  const { quizId, level, quizItemId } = currentQuizItem;

  const { data: { quizItemData } = { quizItemData: null } } = useQuery(GET_QUIZ_ITEM_DATA, {
    variables: { quizId, level, quizItemId },
    skip: !quizId || !level || !quizItemId,
  });

  return {
    caPasseOuCaCash: <CaPasseOuCaCashContainer game={game} quizItemData={quizItemData} />,
    kidimieux: <Kidimieux game={game} quizItemData={quizItemData} />,
  }[(stage as unknown) as QuizStage];
};
