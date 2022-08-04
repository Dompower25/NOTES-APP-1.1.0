import React from 'react'
import { LogInMagic } from '../supabase';
import st from "../style/LogInMagicForm.module.scss";

const LogInMagicForm = ({userEmail, setUserEmail}) => {
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
      <button
        className={st.button}
        onClick={(e) => {
          LogInMagic(e, userEmail);
        }}
      >
        go in
      </button>
    </form>
  );
}

export default LogInMagicForm