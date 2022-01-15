import "./_home-page-dashboard.scss";

import {List, ListItem} from "@hipo/react-ui-toolkit";

import {useAppContext} from "../../core/context/AppContext";
import Todocard from "./components/todocard/Todocard";
import AddTodoCard from "./components/add-todo/AddTodoCard";

interface HomePageDashboardProps {
  customClassName?: string;
}

function HomePageDashboard({customClassName}: HomePageDashboardProps) {
  const {
    appState: {todoCards}
  } = useAppContext();
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
              <Todocard todocardData={item} />
            </ListItem>
          )}
        </List>
      </div>
    </div>
  );
}

export default HomePageDashboard;
