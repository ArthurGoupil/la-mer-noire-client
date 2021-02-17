import { Category } from "models/Category.model";

export type QuizItemId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type QuizItemLevel = "beginner" | "intermediate" | "expert";

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
  level: QuizItemLevel;
  createdAtTimestamp: number;
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

export interface DuoAnswersIndexes {
  quizId: string;
  indexes: number[];
}
