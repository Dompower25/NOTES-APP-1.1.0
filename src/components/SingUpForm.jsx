import React from 'react'
import {
  SingUp
} from "../supabase.js";

const SingUpForm = ({userEmail, setUserEmail, userPass, setUserPass}) => {
  return (
    <form id="singUpForm" className="form">
      <input
        type="text"
        value={userEmail}
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
        placeholder="Email"
      ></input>
      <input
        type="password"
        value={userPass}
        onChange={(e) => {
          setUserPass(e.target.value);
        }}
        placeholder="Password"
        
      ></input>
      <button onClick={(e) => {
          SingUp(e, userEmail, userPass);
          console.log(userEmail, userPass);
        }} type="submit">зарегистрироваться</button>
    </form>
  );
}

export default SingUpForm