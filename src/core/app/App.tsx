import {Route, Routes} from "react-router-dom";

import Login from "../login/Login";

function App() {
  return (
    <Routes>
      <Route path={"/login"}>
        <Login />
      </Route>
    </Routes>
  );
}

export default App;
