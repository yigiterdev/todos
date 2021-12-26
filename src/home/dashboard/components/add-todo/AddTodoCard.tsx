import "./_add-todo-card.scss";

import {useState} from "react";
import {Input} from "@hipo/react-ui-toolkit";
import {FaPlus} from "react-icons/fa";

import Button from "../../../../core/component/button/Button";
import {useAppContext} from "../../../../core/context/AppContext";
import {supabase} from "../../../../supabaseClient";
import {TodoCard, Todos} from "../../../../core/context/types";

function AddTodoCard() {
  const {
    appState: {user},
    dispatchAppStateReducerAction
  } = useAppContext();
  const [category, setCategory] = useState("");

  return (
    <div className={"is-centered has-space-between add-todo-card"}>
      <div>
        <h1 className={"typography--h4 is-centered add-todo-card__title"}>
          {"Add new card"}
        </h1>

        <div className={"is-centered"}>
          <Input
            name={"category"}
            type={"text"}
            value={category}
            onChange={handleInputChange}
            placeholder={"Category"}
          />

          <Button onClick={handleOnClick}>
            <FaPlus />
          </Button>
        </div>
      </div>
    </div>
  );

  async function handleOnClick() {
    try {
      const {error} = await supabase.from("todocard").insert({
        category,
        user_id: user?.id,
        title: "New Todo",
        is_saved: false,
        todos: []
      });

      if (error) {
        throw error;
      } else {
        getUsersTodocards();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUsersTodocards() {
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
          todos: todocard.todos as Todos[]
        })
      );

      dispatchAppStateReducerAction({
        type: "SET_TODO_CARDS",
        todoCards: userTodoCards
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleInputChange(event: React.SyntheticEvent<HTMLInputElement>) {
    setCategory(event.currentTarget.value);
  }
}

export default AddTodoCard;
