import "./_add-todo-card.scss";

import {useState} from "react";
import {Input} from "@hipo/react-ui-toolkit";
import {FaPlus} from "react-icons/fa";

import Button from "../../../../core/component/button/Button";
import {useAppContext} from "../../../../core/context/AppContext";
import {supabase} from "../../../../supabaseClient";
import useGetUsersTodoCards from "../../../../core/context/useGetUsersTodoCards";

function AddTodoCard() {
  const {appState, dispatchAppStateReducerAction} = useAppContext();
  const {refetchGetUsersTodoCard} = useGetUsersTodoCards(
    appState,
    dispatchAppStateReducerAction
  );
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className={"is-centered has-space-between add-todo-card"}>
      <h1 className={"typography--h4 is-centered add-todo-card__title"}>
        {"Add new card"}
      </h1>

      <div className={"add-todo-card__form"}>
        <Input
          name={"title"}
          type={"text"}
          value={title}
          onChange={handleInputChange}
          placeholder={"Title"}
        />

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
  );

  async function handleOnClick() {
    try {
      const {error} = await supabase.from("todocard").insert({
        category,
        user_id: appState.user?.id,
        title,
        is_saved: false,
        todos: []
      });

      if (error) {
        throw error;
      } else {
        refetchGetUsersTodoCard();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleInputChange({currentTarget}: React.SyntheticEvent<HTMLInputElement>) {
    if (currentTarget.name === "title") {
      setTitle(currentTarget.value);
    } else if (currentTarget.name === "category") {
      setCategory(currentTarget.value);
    }
  }
}

export default AddTodoCard;
