import {initialAppState} from "./appState";
import {THEMES, TodoCard, User} from "./types";

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

    default:
      break;
  }

  return newState;
}

export {appStateReducer, initialAppState};
