export const THEMES = {
  LIGHT: "light-theme",
  DARK: "dark-theme"
} as const;

export type AppTheme = ValueOf<typeof THEMES>;

export interface TodoCard {
  id: string;
  userId: string;
  category: string;
  title: string;
  saved: boolean;
  todos: Todos[];
  created_at: string;
}

export interface Todos {
  id: string;
  name: string;
  completed: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
}
