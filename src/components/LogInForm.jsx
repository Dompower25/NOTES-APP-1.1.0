import React, { useState } from "react";
import { LogIn } from "../supabase";
import st from "../style/LogInMagicForm.module.scss";

const LogInForm = ({
  setLogInLoading,
  setStateLogin,
  setUserLogIn,
  
}) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  return (
    <form id="logIn" className={st.login__form}>
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
      <button
        className={st.button}
        onClick={(e) => {
          LogIn(
            userEmail,
            userPass,
            setStateLogin,
            setLogInLoading,
            setUserLogIn,
            e.preventDefault()
          );
        }}
      >
        go in
      </button>
    </form>
  );
};

export default LogInForm;
