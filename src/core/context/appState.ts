import webStorage from "../storage/webStorage";
import {AppTheme, THEMES, TodoCards, User} from "./types";

const initialAppState = {
  theme: getInitialTheme(),
  user: webStorage.local.getItem("user") as null | User,
  todoCards: undefined as undefined | TodoCards[]
};

function getInitialTheme() {
  let initialTheme: AppTheme;

  try {
    const isBrowserDarkTheme =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = webStorage.local.getItem("theme") as AppTheme | null;

    if (storedTheme && (storedTheme === THEMES.LIGHT || storedTheme === THEMES.DARK)) {
      initialTheme = storedTheme;
    } else {
      initialTheme = isBrowserDarkTheme ? THEMES.DARK : THEMES.LIGHT;
    }
  } catch (error) {
    initialTheme = THEMES.LIGHT;
  }

  return initialTheme;
}

export {initialAppState};
