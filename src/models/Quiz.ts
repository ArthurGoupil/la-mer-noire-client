import { Category } from "models/Category";

export interface QuizItem {
  quizItemId: number;
  question: string;
  choices: string[];
  answer: string;
  anecdote?: string;
}

export interface QuizItemData {
  quizId: string;
  category: Category;
  theme: string;
  subTheme: string;
  quiz: QuizItem;
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
