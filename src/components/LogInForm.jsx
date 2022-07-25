import React from 'react'
import { LogIn } from '../supabase';

const LogInForm = ({userEmail, userPass, setUserEmail, setUserPass}) => {
  return (
    <form id="logIn" className="form">
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
      <button
        onClick={(e) => {
          LogIn(e, userEmail, userPass);
        }}
      >
        войти
      </button>
    </form>
  );
}

export default LogInForm