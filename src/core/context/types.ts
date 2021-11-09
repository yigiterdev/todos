export const THEMES = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
} as const;

export type AppTheme = ValueOf<typeof THEMES>;

export interface TodoCards {
  category: string;
  id: string;
  title: string;
  saved: false;
  todos: Todos[] | null;
}

export interface Todos {
  todoId: string;
  name: string;
  completed: boolean;
}

export interface User {
  name: string;
  surname: string;
}
