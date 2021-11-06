import { uuid } from 'react-uuid';

import { initialAppState } from './appState';
import { THEMES, Todos, User } from './types';

export type AppState = typeof initialAppState;

export type AppStateReducerAction =
  | {
      type: 'CHANGE_THEME';
    }
  | {
      type: 'SET_USER';
      user: User;
    }
  | {
      type: 'ADD_TODO_CARDS';
      category: string;
    }
  | {
      type: 'REMOVE_TODO_CARD';
      id: string;
    }
  | {
      type: 'HANDLE_CARD_TITLE';
      title: string;
      id: string;
    }
  | {
      type: 'HANDLE_CARD_SAVE';
      save: boolean;
      id: string;
    }
  | {
      type: 'HANDLE_CARD_TODOS';
      todos: Todos[];
      id: string;
    };

function appStateReducer(
  state: AppState,
  action: AppStateReducerAction
): AppState {
  let newState = state;

  switch (action.type) {
    case 'CHANGE_THEME': {
      newState = {
        ...state,
        theme: state.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK,
      };
      break;
    }

    case 'SET_USER': {
      newState = {
        ...state,
        user: action.user,
      };

      break;
    }

    case 'ADD_TODO_CARDS': {
      newState = {
        ...state,
        todoCards: [
          ...state.todoCards,
          {
            category: action.category,
            id: uuid(),
            title: 'New Todo',
            saved: false,
            todos: [],
          },
        ],
      };

      break;
    }

    case 'REMOVE_TODO_CARD': {
      const newTodoCards = state.todoCards.filter(
        (item) => item.id !== action.id
      );

      newState = {
        ...state,
        todoCards: newTodoCards,
      };

      break;
    }

    case 'HANDLE_CARD_TITLE': {
      const newTodoCards = [];

      state.todoCards.forEach((todocard) => {
        if (todocard.id === action.id) {
          const newTodoCard = {
            category: todocard.category,
            id: todocard.id,
            title: action.title,
            saved: todocard.saved,
            todos: todocard.todos,
          };
          newTodoCards.push(newTodoCard);
        } else {
          newTodoCards.push(todocard);
        }
      });

      newState = {
        ...state,
        todoCards: newTodoCards,
      };

      break;
    }

    case 'HANDLE_CARD_SAVE': {
      const newTodoCards = [];

      state.todoCards.forEach((todocard) => {
        if (todocard.id === action.id) {
          const newTodoCard = {
            category: todocard.category,
            id: todocard.id,
            title: todocard.title,
            saved: action.save,
            todos: todocard.todos,
          };
          newTodoCards.push(newTodoCard);
        } else {
          newTodoCards.push(todocard);
        }
      });

      newState = {
        ...state,
        todoCards: newTodoCards,
      };

      break;
    }

    case 'HANDLE_CARD_TODOS': {
      const newTodoCards = [];

      state.todoCards.forEach((todocard) => {
        if (todocard.id === action.id) {
          const newTodoCard = {
            category: todocard.category,
            id: todocard.id,
            title: todocard.title,
            saved: todocard.saved,
            todos: action.todos,
          };
          newTodoCards.push(newTodoCard);
        } else {
          newTodoCards.push(todocard);
        }
      });

      newState = {
        ...state,
        todoCards: newTodoCards,
      };

      break;
    }

    default:
      break;
  }

  return newState;
}

export { appStateReducer, initialAppState };
