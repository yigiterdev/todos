import {Input} from "@hipo/react-ui-toolkit";
import {useState} from "react";

import Form from "../../core/component/form/Form";
import Page from "../../core/component/page/Page";
import Button from "../../core/component/button/Button";

function ConfirmSignup() {
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Page>
      <Form onSubmit={confirmSignUp} customClassName={"login-page__form is-centered"}>
        <div>
          <h2 className={"is-centered typography--h4"}>{"Confirm signup"}</h2>

          <label htmlFor={email} className={"typography--body-semibold"}>
            {"Confirm your email"}
          </label>

          <Input
            customClassName={"login-page__form__input"}
            name={"email"}
            type={"email"}
            value={email}
            onChange={handleInputChange}
            placeholder={"johndoe@example.com"}
          />

          <label htmlFor={verificationCode} className={"typography--body-semibold"}>
            {"Verification Code"}
          </label>

          <Input
            customClassName={"login-page__form__input"}
            name={"verification"}
            type={"text"}
            value={verificationCode}
            onChange={handleInputChange}
            placeholder={"Verification Code"}
          />

          <Button
            size={"large"}
            type={"submit"}
            customClassName={"login-page__form__button"}
          >
            {"Confirm signup"}
          </Button>
        </div>
      </Form>
    </Page>
  );

  function confirmSignUp() {
    console.log("Confirm");
  }

  function handleInputChange(event: React.SyntheticEvent<HTMLInputElement>) {
    if (event.currentTarget.name === "verification") {
      setVerificationCode(event.currentTarget.value);
    } else if (event.currentTarget.name === "email") {
      setEmail(event.currentTarget.value);
    }
  }
}

export default ConfirmSignup;
