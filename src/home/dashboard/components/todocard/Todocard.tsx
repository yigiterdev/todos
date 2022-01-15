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
import useGetUsersTodoCards from "../../../../core/context/useGetUsersTodoCards";

interface TodocardProps {
  todocardData: TodoCard;
}

function Todocard({todocardData}: TodocardProps) {
  const {appState, dispatchAppStateReducerAction} = useAppContext();
  const {refetchGetUsersTodoCard} = useGetUsersTodoCards(
    appState,
    dispatchAppStateReducerAction
  );
  const [todoTitle, setTodoTitle] = useState("");
  const sortedTodos = todocardData.todos.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

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

      <List items={sortedTodos} customClassName={"todocard__todos"}>
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
              completed: false,
              createdAt: String(new Date())
            }
          ]
        })
        .eq("id", todocardData.id);

      if (error) {
        throw error;
      } else {
        refetchGetUsersTodoCard();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTodo(todoId: string) {
    try {
      const updatedTodos = todocardData.todos.filter((todo) => todo.id !== todoId);

      const {error} = await supabase
        .from("todocard")
        .update({
          todos: updatedTodos
        })
        .eq("id", todocardData.id);

      if (error) {
        throw error;
      } else {
        refetchGetUsersTodoCard();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCompleteTodo(todos: Todos) {
    try {
      const updatedTodoIndex = todocardData.todos.findIndex(
        (todo) => todo.id === todos.id
      );
      const updatedTodos = todocardData.todos;

      updatedTodos[updatedTodoIndex] = {
        id: todos.id,
        name: todos.name,
        completed: !todos.completed,
        createdAt: todos.createdAt
      };

      const {error} = await supabase
        .from("todocard")
        .update({
          todos: updatedTodos
        })
        .eq("id", todocardData.id);

      if (error) {
        throw error;
      } else {
        refetchGetUsersTodoCard();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Todocard;
