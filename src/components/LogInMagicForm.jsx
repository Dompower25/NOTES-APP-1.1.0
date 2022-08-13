import React, { useState } from 'react'
import { LogInMagic } from '../supabase';
import st from "../style/LogInMagicForm.module.scss";

const LogInMagicForm = () => {
  
    const [userEmail, setUserEmail] = useState("");
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
          LogInMagic(userEmail, e.preventDefault());
        }}
      >
        go in
      </button>
    </form>
  );
}

export default LogInMagicForm