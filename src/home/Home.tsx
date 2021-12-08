import "./_home.scss";

import {useEffect} from "react";
import {useHistory} from "react-router";

import {useAppContext} from "../core/context/AppContext";
import HomePageSidebar from "./sidebar/HomePageSidebar";
import HomePageDashboard from "./dashboard/HomePageDashboard";

function Home() {
  const {
    appState: {user}
  } = useAppContext();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  return (
    <div className={"home-page"}>
      <HomePageSidebar customClassName={"home-page__sidebar"} />
      <HomePageDashboard customClassName={"home-page__dashboard"} />
    </div>
  );
}

export default Home;
