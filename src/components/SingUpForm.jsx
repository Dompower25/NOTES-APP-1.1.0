import React from 'react'
import {
  SingUp
} from "../supabase.js";
import st from "../style/LogInMagicForm.module.scss";

const SingUpForm = ({userEmail, setUserEmail, userPass, setUserPass}) => {
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
          SingUp(e, userEmail, userPass);
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