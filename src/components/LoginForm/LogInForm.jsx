import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../hooks/useUser";
import Loader from "../../UI/loader/Loader";
import st from "./LogInForm.module.scss";

const LogInForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [, onLogIn, , , errors, spinner] = useContext(UserContext);

  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      onLogIn(userEmail, userPass);
    },
    [onLogIn, userEmail, userPass]
  );

  return (
    <form id="logIn" className={st.login__form}>
      {spinner ? (
        <Loader />
      ) : (
        <div className={st.box}>
          <div className={st.errorMessage}>
            <span>{errors}</span>
          </div>
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
          <button className={st.button} onClick={onClick}>
            go in
          </button>
        </div>
      )}
    </form>
  );
};

export default LogInForm;
