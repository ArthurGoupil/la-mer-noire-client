import { QuizItemId } from "models/Game.model";

const getRandomQuizItemId = (): QuizItemId => {
  return (Math.floor(Math.random() * 10) + 1) as QuizItemId;
};

export default getRandomQuizItemId;
