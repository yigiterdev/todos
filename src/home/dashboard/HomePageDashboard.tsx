import "./_home-page-dashboard.scss";

import AddTodoCard from "./components/add-todo/AddTodoCard";

interface HomePageDashboardProps {
  customClassName?: string;
}

function HomePageDashboard({customClassName}: HomePageDashboardProps) {
  return (
    <div className={customClassName}>
      <div className={"home-page-dashboard__content"}>
        <AddTodoCard />
      </div>
    </div>
  );
}

export default HomePageDashboard;
