import {Dispatch, useCallback, useEffect} from "react";

import {supabase} from "../../supabaseClient";
import {AppState, AppStateReducerAction} from "./appStateReducer";
import {TodoCard, Todos} from "./types";

function useGetUsersTodoCards(
  appState: AppState,
  dispatchAppStateReducerAction: Dispatch<AppStateReducerAction>
) {
  const {user} = appState;

  const refetch = useCallback(async () => {
    const userTodoCards: TodoCard[] = [];

    try {
      const {data, error} = await supabase
        .from("todocard")
        .select()
        .eq("user_id", user?.id);

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
  }, [dispatchAppStateReducerAction, user]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    refetchGetUsersTodoCard: refetch
  };
}

export default useGetUsersTodoCards;
