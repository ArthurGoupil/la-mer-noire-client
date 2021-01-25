import { Category } from "./Category";

export interface QuizItem {
  _id: number;
  question: string;
  choices: string[];
  answer: string;
  anecdote?: string;
}

export interface Quiz {
  _id: string;
  category: Category;
  theme: string;
  subTheme: string;
  difficulty: number;
  quizItems: {
    [beginner: string]: QuizItem[];
    intermediate: QuizItem[];
    expert: QuizItem[];
  };
}
