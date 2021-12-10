import logoSrc from "../core/ui/img/todos.png";

import "./_login.scss";

import {useState} from "react";
import {Input} from "@hipo/react-ui-toolkit";

import Form from "../core/component/form/Form";
import Page from "../core/component/page/Page";
import Button from "../core/component/button/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Page>
      <Form onSubmit={signIn} customClassName={"login-page__form is-centered"}>
        <div>
          <img src={logoSrc} className={"is-centered login-page__logo"} alt={"logo"} />

          <h2 className={"is-centered typography--h4"}>{"Login"}</h2>

          <label htmlFor={email} className={"typography--body-semibold"}>
            {"Email"}
          </label>

          <Input
            customClassName={"login-page__form__input"}
            name={"email"}
            type={"email"}
            value={email}
            onChange={handleInputChange}
            placeholder={"johndoe@example.com"}
          />

          <label htmlFor={password} className={"typography--body-semibold"}>
            {"Password"}
          </label>

          <Input
            customClassName={"login-page__form__input"}
            name={"password"}
            type={"password"}
            value={password}
            onChange={handleInputChange}
            placeholder={"Password"}
          />

          <Button
            size={"large"}
            type={"submit"}
            customClassName={"login-page__form__button"}
          >
            {"Login"}
          </Button>
        </div>
      </Form>
    </Page>
  );

  function signIn() {
    console.log("Login");
  }

  function handleInputChange(event: React.SyntheticEvent<HTMLInputElement>) {
    if (event.currentTarget.name === "password") {
      setPassword(event.currentTarget.value);
    } else if (event.currentTarget.name === "email") {
      setEmail(event.currentTarget.value);
    }
  }
}

export default Login;
