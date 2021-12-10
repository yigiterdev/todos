import {Route, Switch} from "react-router-dom";

import Login from "../../login/Login";
import Home from "../../home/Home";
import Signup from "../../signup/Signup";

function App() {
  return (
    <Switch>
      <Route path={"/"} exact={true}>
        <Home />
      </Route>

      <Route path={"/login"}>
        <Login />
      </Route>

      <Route path={"/signup"}>
        <Signup />
      </Route>
    </Switch>
  );
}

export default App;
