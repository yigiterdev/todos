import "./_home.scss";

import {useEffect} from "react";
import {useHistory} from "react-router";

import {useAppContext} from "../core/context/AppContext";
import HomePageSidebar from "./sidebar/HomePageSidebar";
import HomePageDashboard from "./dashboard/HomePageDashboard";
import Page from "../core/component/page/Page";

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
    <Page
      customClassName={"home-page"}
      metaAttributes={{title: "Home | Todos"}}
      shouldDisplayHeader={false}
    >
      <HomePageSidebar customClassName={"home-page__sidebar"} />
      <HomePageDashboard customClassName={"home-page__dashboard"} />
    </Page>
  );
}

export default Home;
