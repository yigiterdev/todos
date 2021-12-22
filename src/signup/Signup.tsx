import {useState} from "react";
import {Input} from "@hipo/react-ui-toolkit";
import {Link, useHistory} from "react-router-dom";
import {useToast} from "@chakra-ui/react";

import Form from "../core/component/form/Form";
import Page from "../core/component/page/Page";
import Button from "../core/component/button/Button";
import {supabase} from "../supabaseClient";

function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();
  const toast = useToast();

  return (
    <Page metaAttributes={{title: "Signup | Todos"}}>
      <Form onSubmit={signUp} customClassName={"login-page__form is-centered"}>
        <div>
          <h2 className={"is-centered typography--h4 login-page__form__header"}>
            {"Signup"}
          </h2>

          <label htmlFor={username} className={"typography--body-semibold"}>
            {"Username"}
          </label>

          <Input
            customClassName={"login-page__form__input"}
            name={"username"}
            type={"text"}
            value={username}
            onChange={handleInputChange}
            placeholder={"johndoe"}
          />

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
            {"Signup"}
          </Button>

          <Link
            className={"typography--body-semibold is-centered login-page__form__link"}
            to={"/login"}
          >
            {"Already have an account?"}
          </Link>
        </div>
      </Form>
    </Page>
  );

  async function signUp() {
    try {
      const {error} = await supabase.auth.signUp(
        {
          email,
          password
        },
        {
          data: {
            username
          }
        }
      );

      if (error) throw error;
      toast({
        title: "Signup successful",
        description: "You have to confirm your email address before login.",
        status: "success",
        position: "bottom-right",
        duration: 10000,
        isClosable: true
      });

      history.push("/login");
    } catch (error) {
      toast({
        title: "Signup wasn't successful",
        description:
          "This email is already registered. Please, Try different email address.",
        status: "error",
        position: "bottom-right",
        duration: 10000,
        isClosable: true
      });
    }
  }

  function handleInputChange(event: React.SyntheticEvent<HTMLInputElement>) {
    if (event.currentTarget.name === "password") {
      setPassword(event.currentTarget.value);
    } else if (event.currentTarget.name === "email") {
      setEmail(event.currentTarget.value);
    } else if (event.currentTarget.name === "username") {
      setUsername(event.currentTarget.value);
    }
  }
}

export default Signup;
