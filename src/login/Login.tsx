import "./_login.scss";

import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Input} from "@hipo/react-ui-toolkit";
import {useToast} from "@chakra-ui/react";

import Form from "../core/component/form/Form";
import Page from "../core/component/page/Page";
import Button from "../core/component/button/Button";
import {supabase} from "../supabaseClient";
import {useAppContext} from "../core/context/AppContext";
import webStorage from "../core/storage/webStorage";

function Login() {
  const {dispatchAppStateReducerAction} = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const toast = useToast();

  return (
    <Page metaAttributes={{title: "Login | Todos"}}>
      <Form onSubmit={signIn} customClassName={"login-page__form is-centered"}>
        <div>
          <h2 className={"is-centered typography--h4 login-page__form__header"}>
            {"Login"}
          </h2>

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

          <Link
            className={"typography--body-semibold is-centered login-page__form__link"}
            to={"/signup"}
          >
            {"Let's get you an account!"}
          </Link>
        </div>
      </Form>
    </Page>
  );

  async function signIn() {
    try {
      const {user, error} = await supabase.auth.signIn({email, password});

      if (error) throw error;

      if (user?.email && user.id) {
        dispatchAppStateReducerAction({
          type: "SET_USER",
          user: {
            email: user.email,
            id: user.id,
            username: user.user_metadata.username
          }
        });
        webStorage.local.setItem("user", user);

        toast({
          title: "Login successful",
          description: "We are going to redirect you home page",
          status: "success",
          position: "bottom-right",
          duration: 2000,
          isClosable: true
        });

        history.push("/");
      }
    } catch (error) {
      toast({
        title: "Login unsuccessful",
        description: "User credentials is not true",
        status: "error",
        position: "bottom-right",
        duration: 5000,
        isClosable: true
      });
    }
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
