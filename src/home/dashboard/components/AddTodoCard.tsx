import "./_add-todo-card.scss";

import {useState} from "react";
import {Input} from "@hipo/react-ui-toolkit";
import {FaPlus} from "react-icons/fa";

import Button from "../../../core/component/button/Button";
import {useAppContext} from "../../../core/context/AppContext";
import {supabase} from "../../../supabaseClient";

function AddTodoCard() {
  const {
    appState: {user},
    dispatchAppStateReducerAction
  } = useAppContext();
  const [category, setCategory] = useState("");

  return (
    <div className={"is-centered add-todo-card"}>
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

      <Button onClick={fetchTodoCards}>{"Click"}</Button>
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

      if (error) throw error;

      dispatchAppStateReducerAction({
        type: "ADD_TODO_CARDS",
        userId: user!.id,
        category
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTodoCards() {
    try {
      const {data, error} = await supabase
        .from("todocard")
        .select()
        .eq("user_id", user?.id);

      if (error) throw error;

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  function handleInputChange(event: React.SyntheticEvent<HTMLInputElement>) {
    setCategory(event.currentTarget.value);
  }
}

export default AddTodoCard;
