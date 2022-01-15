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
import {supabase} from "../../supabaseClient";
import {TodoCard, Todos} from "./types";

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
    (async () => {
      const userTodoCards: TodoCard[] = [];

      try {
        const {data, error} = await supabase
          .from("todocard")
          .select()
          .eq("user_id", appState.user?.id);

        if (error) throw error;

        data?.map((todocard) =>
          userTodoCards.push({
            id: todocard.id,
            userId: todocard.user_id,
            category: todocard.category,
            title: todocard.title,
            saved: todocard.is_saved,
            todos: todocard.todos as Todos[],
            created_at: todocard.created_at
          })
        );

        dispatchAppStateReducerAction({
          type: "SET_TODO_CARDS",
          todoCards: userTodoCards
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [appState.user]);

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
