import React, { useState } from "react";
import { LogOut, userLog, supabase } from "../supabase";
import LogInForm from "./LogInForm";
import LogInMagicForm from "./LogInMagicForm";
import SingUpForm from "./SingUpForm";
import st from "../style/Modal.module.scss";

const Modal = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  return (
    <div className={st.modal}>
      <div className={st.login__form}>
        <span className={st.log}>вход</span>
        <LogInMagicForm userEmail={userEmail} setUserEmail={setUserEmail} />
        <LogInForm
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userPass={userPass}
          setUserPass={setUserPass}
        />
        <span>У вас еще нет аккаунта?</span>
      </div>
      <div className="register__form">
        <SingUpForm
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userPass={userPass}
          setUserPass={setUserPass}
        />
      </div>
    </div>
  );
};

export default Modal;
