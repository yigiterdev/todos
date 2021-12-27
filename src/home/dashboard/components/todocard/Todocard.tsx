import "./_todocard.scss";

import {useState} from "react";
import classNames from "classnames";
import {Input, List, ListItem} from "@hipo/react-ui-toolkit";
import {v4 as uuidv4} from "uuid";
import {FaPlus, FaTrash, FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa";

import {TodoCard, Todos} from "../../../../core/context/types";
import Button from "../../../../core/component/button/Button";
import {supabase} from "../../../../supabaseClient";
import {useAppContext} from "../../../../core/context/AppContext";

interface TodocardProps {
  todocardData: TodoCard;
}

function Todocard({todocardData}: TodocardProps) {
  const {
    appState: {user},
    dispatchAppStateReducerAction
  } = useAppContext();
  const [todoTitle, setTodoTitle] = useState("");

  return (
    <div className={"todocard"}>
      <h1 className={"typography--h4 todocard__title"}>{todocardData.title}</h1>

      <div className={"todocard__add-todo-form"}>
        <Input
          name={"todo"}
          type={"text"}
          value={todoTitle}
          onChange={handleInputChange}
          placeholder={"Add new todo"}
        />

        <Button onClick={handleOnClick}>
          <FaPlus />
        </Button>
      </div>

      <List items={todocardData.todos} customClassName={"todocard__todos"}>
        {(item) => (
          <ListItem
            customClassName={classNames("todocard__todos__item", {
              "todocard__todos__item--completed": item.completed
            })}
          >
            <h3 className={"typography--body-semibold todocard__todos__item__title"}>
              {item.name}
            </h3>

            {item.completed ? (
              <FaRegThumbsDown
                className={"todocard__todos__item__icon"}
                // eslint-disable-next-line
                onClick={() => {
                  handleCompleteTodo(item);
                }}
              />
            ) : (
              <FaRegThumbsUp
                className={"todocard__todos__item__icon"}
                // eslint-disable-next-line
                onClick={() => {
                  handleCompleteTodo(item);
                }}
              />
            )}

            <FaTrash
              className={"todocard__todos__item__icon"}
              // eslint-disable-next-line
              onClick={() => {
                handleDeleteTodo(item.id);
              }}
            />
          </ListItem>
        )}
      </List>
    </div>
  );

  function handleInputChange(event: React.SyntheticEvent<HTMLInputElement>) {
    setTodoTitle(event.currentTarget.value);
  }

  async function handleOnClick() {
    try {
      const {error} = await supabase
        .from("todocard")
        .update({
          todos: [
            ...todocardData.todos,
            {
              id: uuidv4(),
              name: todoTitle,
              completed: false
            }
          ]
        })
        .eq("id", todocardData.id);

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

  async function handleDeleteTodo(todoId: string) {
    try {
      const newTodos = todocardData.todos.filter((todo) => todo.id !== todoId);

      const {error} = await supabase
        .from("todocard")
        .update({
          todos: newTodos
        })
        .eq("id", todocardData.id);

      if (error) {
        throw error;
      } else {
        getUsersTodocards();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCompleteTodo(todos: Todos) {
    try {
      let updatedTodo = todocardData.todos.find((todo) => todo.id === todos.id);
      const sameTodos = todocardData.todos.filter((todo) => todo.id !== todos.id);

      updatedTodo = {
        id: todos.id,
        name: todos.name,
        completed: !todos.completed
      };

      sameTodos.push(updatedTodo);

      const {error} = await supabase
        .from("todocard")
        .update({
          todos: sameTodos
        })
        .eq("id", todocardData.id);

      if (error) {
        throw error;
      } else {
        getUsersTodocards();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Todocard;
