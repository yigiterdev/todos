import "./_home-page-dashboard.scss";

import {List, ListItem} from "@hipo/react-ui-toolkit";

import {useAppContext} from "../../core/context/AppContext";
import Todocard from "./components/todocard/Todocard";
import AddTodoCard from "./components/add-todo/AddTodoCard";
import {supabase} from "../../supabaseClient";
import useGetUsersTodoCards from "../../core/context/useGetUsersTodoCards";

interface HomePageDashboardProps {
  customClassName?: string;
}

function HomePageDashboard({customClassName}: HomePageDashboardProps) {
  const {appState, dispatchAppStateReducerAction} = useAppContext();
  const {refetchGetUsersTodoCard} = useGetUsersTodoCards(
    appState,
    dispatchAppStateReducerAction
  );
  const {todoCards} = appState;
  const sortedTodoCards = todoCards.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className={customClassName}>
      <div className={"home-page-dashboard__content"}>
        <AddTodoCard />

        <List
          items={sortedTodoCards}
          customClassName={"home-page-dashboard__content__items"}
        >
          {(item) => (
            <ListItem customClassName={"home-page-dashboard__content__item"}>
              <Todocard
                todocardData={item}
                // eslint-disable-next-line
                onDelete={() => {
                  handleDeleteCard(item.id);
                }}
              />
            </ListItem>
          )}
        </List>
      </div>
    </div>
  );

  async function handleDeleteCard(cardId: string) {
    try {
      const {error} = await supabase.from("todocard").delete().match({id: cardId});

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

export default HomePageDashboard;
