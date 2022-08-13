import React, { useState } from 'react'
import {
  SingUp
} from "../supabase.js";
import st from "../style/LogInMagicForm.module.scss";

const SingUpForm = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
  return (
    <form id="singUpForm" className={st.singUpForm}>
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
          SingUp(userEmail, userPass, e.preventDefault());
          console.log(userEmail, userPass);
        }}
        type="submit"
      >
        registration
      </button>
    </form>
  );
}

export default SingUpForm