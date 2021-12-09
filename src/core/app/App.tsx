import {Route, Switch} from "react-router-dom";
import Amplify from "aws-amplify";

import Login from "../../login/Login";
import Home from "../../home/Home";
import awsmobile from "../../aws-exports";
import Signup from "../../signup/Signup";
import ConfirmSignup from "../../signup/confirm/ConfirmSignup";

Amplify.configure(awsmobile);

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

      <Route path={"/confirm-signup"}>
        <ConfirmSignup />
      </Route>
    </Switch>
  );
}

export default App;
