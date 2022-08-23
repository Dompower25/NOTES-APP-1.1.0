import React, { useCallback, useState } from "react";
import { singUp } from "../../processes/supabase";
import Loader from "../../UI/loader/Loader";
import st from "./SingUpForm.module.scss";

const SingUpForm = ({ setShowRegistration }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [spinner, setSpinner] = useState(false);

  const onCLick = useCallback(
    (e) => {
      e.preventDefault();
      setSpinner(true);
      singUp(userEmail, userPass)
        .then(({ user, error }) => {
          if (error) {
            setErrorMessage(error.message);
          } else {
            setMessage(
              `Activate your account, follow the link from the Email ${userEmail}`
            );
          }
        })
        .finally(() => {
          setSpinner(false);
        });
    },
    [userEmail, userPass]
  );

  return (
    <form id="singUpForm" className={st.singUpForm}>
      <div className={st.errorMessage}>
        <span className={st.errorMessage}>{errorMessage}</span>
        <span className={st.finallyMessage}>{message}</span>
      </div>
      {spinner ? (
        <Loader />
      ) : (
        <div className={st.singUpForm}>
          <input
            className={st.input}
            type="text"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            placeholder="Email"
          ></input>
          <input
            className={st.input}
            type="password"
            value={userPass}
            onChange={(e) => {
              setUserPass(e.target.value);
            }}
            placeholder="Password"
          ></input>
        </div>
      )}

      <button className={st.button} onClick={onCLick} type="submit">
        registration
      </button>
      <button
        className="not_autorisation"
        onClick={(e) => {
          e.preventDefault();
          setShowRegistration(false);
        }}
      >
        I have an account
      </button>
    </form>
  );
};

export default SingUpForm;
