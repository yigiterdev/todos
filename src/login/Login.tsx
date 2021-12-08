import logoSrc from "../core/ui/img/todos.png";

import "./_login.scss";

import {useState} from "react";
import {useHistory} from "react-router";
import {Input} from "@hipo/react-ui-toolkit";

import {useAppContext} from "../core/context/AppContext";
import Form from "../core/component/form/Form";
import Page from "../core/component/page/Page";
import Button from "../core/component/button/Button";

function Login() {
  const {dispatchAppStateReducerAction} = useAppContext();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const history = useHistory();

  return (
    <Page>
      <Form onSubmit={handleFormSubmit} customClassName={"login-page__form is-centered"}>
        <div>
          <img src={logoSrc} className={"is-centered login-page__logo"} alt={"logo"} />

          <label htmlFor={name} className={"typography--body-semibold"}>
            {"Name"}
          </label>

          <Input
            customClassName={"login-page__form__input"}
            name={"name"}
            type={"text"}
            value={name}
            onChange={handleInputChange}
            placeholder={"Name"}
          />

          <label htmlFor={surname} className={"typography--body-semibold"}>
            {"Surname"}
          </label>

          <Input
            customClassName={"login-page__form__input"}
            name={"surname"}
            type={"text"}
            value={surname}
            onChange={handleInputChange}
            placeholder={"Surname"}
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

  function handleInputChange(event: React.SyntheticEvent<HTMLInputElement>) {
    if (event.currentTarget.name === "name") {
      setName(event.currentTarget.value);
    } else if (event.currentTarget.name === "surname") {
      setSurname(event.currentTarget.value);
    }
  }

  function handleFormSubmit() {
    dispatchAppStateReducerAction({
      type: "SET_USER",
      user: {
        name,
        surname
      }
    });
    history.push("/");
  }
}

export default Login;
