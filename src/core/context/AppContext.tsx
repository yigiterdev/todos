import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer
} from "react";

import {initialAppState} from "./appState";
import {appStateReducer, AppStateReducerAction} from "./appStateReducer";
import webStorage from "../storage/webStorage";

const AppContext = createContext({
  appState: initialAppState,
  dispatchAppStateReducerAction: (() => undefined) as Dispatch<AppStateReducerAction>
});

function AppContextProvider({children}: {children: React.ReactNode}) {
  const [appState, dispatchAppStateReducerAction] = useReducer(
    appStateReducer,
    initialAppState
  );

  useEffect(() => {
    webStorage.local.setItem("user", appState.user);
  }, [appState.user]);

  useLayoutEffect(() => {
    webStorage.local.setItem("theme", appState.theme);

    document.documentElement.classList.add(appState.theme);

    return () => {
      document.documentElement.classList.remove(appState.theme);
    };
  }, [appState.theme]);

  return (
    <AppContext.Provider
      value={{
        appState,
        dispatchAppStateReducerAction
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export {AppContextProvider, AppContext, useAppContext};

export const {Consumer} = AppContext;
