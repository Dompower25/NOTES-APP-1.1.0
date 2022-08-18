import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../hooks/useUser";
import st from "./LogInMagicForm.module.scss";

const LogInMagicForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [, , onLogInMagic] = useContext(UserContext);

  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      onLogInMagic(userEmail);
    },
    [userEmail, onLogInMagic]
  );

  return (
    <form id="logInMagic" className={st.magic__login__form}>
      <input
        className={st.input}
        type="text"
        value={userEmail}
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
        placeholder="email login"
      ></input>
      <button className={st.button} onClick={onClick}>
        go in
      </button>
    </form>
  );
};

export default LogInMagicForm;
