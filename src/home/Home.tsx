import "./_home.scss";

import {useEffect} from "react";
import {useHistory} from "react-router";

import {useAppContext} from "../core/context/AppContext";

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
      <div className={"home-page__sidebar"}>{"Sidebar"}</div>
      <div className={"home-page__dashboard"}>{"Dashboard"}</div>
    </div>
  );
}

export default Home;
