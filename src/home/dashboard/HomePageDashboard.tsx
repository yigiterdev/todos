import "./_home-page-dashboard.scss";

import {useEffect} from "react";

import AddTodoCard from "./components/AddTodoCard";
import {supabase} from "../../supabaseClient";
import {useAppContext} from "../../core/context/AppContext";

interface HomePageDashboardProps {
  customClassName?: string;
}

function HomePageDashboard({customClassName}: HomePageDashboardProps) {
  const {
    appState: {user}
  } = useAppContext();

  useEffect(() => {
    (async () => {
      try {
        const {data, error} = await supabase
          .from("todocard")
          .select()
          .eq("user_id", user?.id);

        if (error) throw error;

        console.log(data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);
  return (
    <div className={customClassName}>
      <div className={"home-page-dashboard__content"}>
        <AddTodoCard />
      </div>
    </div>
  );
}

export default HomePageDashboard;
