import {Route, Switch} from "react-router-dom";

import Login from "../../login/Login";
import Home from "../../home/Home";

function App() {
  return (
    <Switch>
      <Route path={"/"} exact={true}>
        <Home />
      </Route>

      <Route path={"/login"}>
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
