import {initialAppState} from "./appState";
import {THEMES, TodoCard, Todos, User} from "./types";

export type AppState = typeof initialAppState;

export type AppStateReducerAction =
  | {
      type: "CHANGE_THEME";
    }
  | {
      type: "SET_USER";
      user: User | null;
    }
  | {
      type: "SET_TODO_CARDS";
      todoCards: TodoCard[];
    }
  | {
      type: "HANDLE_CARD_TITLE";
      title: string;
      id: string;
    }
  | {
      type: "HANDLE_CARD_SAVE";
      save: boolean;
      id: string;
    }
  | {
      type: "HANDLE_CARD_TODOS";
      todos: Todos[];
      id: string;
    };

function appStateReducer(state: AppState, action: AppStateReducerAction): AppState {
  let newState = state;

  switch (action.type) {
    case "CHANGE_THEME": {
      newState = {
        ...state,
        theme: state.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
      };
      break;
    }

    case "SET_USER": {
      newState = {
        ...state,
        user: action.user
      };

      break;
    }

    case "SET_TODO_CARDS": {
      newState = {
        ...state,
        todoCards: action.todoCards
      };

      break;
    }

    case "HANDLE_CARD_TITLE": {
      const newTodoCards: TodoCard[] = [];

      state.todoCards?.forEach((todocard) => {
        if (todocard.id === action.id) {
          const newTodoCard: TodoCard = {
            category: todocard.category,
            userId: todocard.userId,
            id: todocard.id,
            title: action.title,
            saved: todocard.saved,
            todos: todocard.todos
          };

          newTodoCards.push(newTodoCard);
        } else {
          newTodoCards.push(todocard);
        }
      });

      newState = {
        ...state,
        todoCards: newTodoCards
      };

      break;
    }

    case "HANDLE_CARD_SAVE": {
      const newTodoCards: TodoCard[] = [];

      state.todoCards?.forEach((todocard) => {
        if (todocard.id === action.id) {
          const newTodoCard: TodoCard = {
            category: todocard.category,
            userId: todocard.userId,
            id: todocard.id,
            title: todocard.title,
            saved: action.save,
            todos: todocard.todos
          };

          newTodoCards.push(newTodoCard);
        } else {
          newTodoCards.push(todocard);
        }
      });

      newState = {
        ...state,
        todoCards: newTodoCards
      };

      break;
    }

    case "HANDLE_CARD_TODOS": {
      const newTodoCards: TodoCard[] = [];

      state.todoCards?.forEach((todocard) => {
        if (todocard.id === action.id) {
          const newTodoCard: TodoCard = {
            category: todocard.category,
            userId: todocard.userId,
            id: todocard.id,
            title: todocard.title,
            saved: todocard.saved,
            todos: action.todos
          };

          newTodoCards.push(newTodoCard);
        } else {
          newTodoCards.push(todocard);
        }
      });

      newState = {
        ...state,
        todoCards: newTodoCards
      };

      break;
    }

    default:
      break;
  }

  return newState;
}

export {appStateReducer, initialAppState};
