import {useState} from "react";
import {Input} from "@hipo/react-ui-toolkit";
import {Link} from "react-router-dom";
import {useToast} from "@chakra-ui/react";

import Form from "../core/component/form/Form";
import Page from "../core/component/page/Page";
import Button from "../core/component/button/Button";
import {supabase} from "../supabaseClient";

function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const toast = useToast();

  return (
    <Page>
      <Form onSubmit={signUp} customClassName={"login-page__form is-centered"}>
        <div>
          <h2 className={"is-centered typography--h4 login-page__form__header"}>
            {"Signup"}
          </h2>

          <label htmlFor={password} className={"typography--body-semibold"}>
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

          <span className={"typography--body-semibold"}>
            {"Do you have "}
            <Link className={"login-page__form__link"} to={"/login"}>
              {"account?"}
            </Link>
          </span>
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
        description: "You have to confirm your email address.",
        status: "warning",
        position: "top",
        duration: 10000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: "Signup wasn't successful",
        description: "Please, Try again.",
        status: "error",
        position: "top",
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
