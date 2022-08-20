import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../hooks/useUser";
import Loader from "../../UI/loader/Loader";
import st from "./LogInForm.module.scss";

const LogInForm = () => {
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [, onLogin] = useContext(UserContext);

  const onClick = useCallback(
    (e) => {
      setLoading(true);
      e.preventDefault();
      onLogin(userEmail, userPass);
      setTimeout(() => {
        //как сделать спиннер без timeOut?  ждать ответ от supabase?
        setLoading(false);
      }, 3000);
    },
    [userEmail, userPass, onLogin]
  );

  return (
    <form id="logIn" className={st.login__form}>
      {loading ? (
        <Loader />
      ) : (
        <div className={st.box}>
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
