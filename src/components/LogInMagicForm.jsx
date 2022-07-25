import React from 'react'
import { LogInMagic } from '../supabase';

const LogInMagicForm = ({userEmail, setUserEmail}) => {
  return (
    <form id="logInMagic">
      <input
        type="text"
        value={userEmail}
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
        placeholder="Email"
      ></input>
      <button
        onClick={(e) => {
          LogInMagic(e, userEmail);
        }}
      >
        войти при помощи Email
      </button>
    </form>
  );
}

export default LogInMagicForm