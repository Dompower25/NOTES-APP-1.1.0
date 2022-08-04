import React, { useState } from "react";
import { LogOut, userLog, supabase } from "../supabase";
import LogInForm from "./LogInForm";
import LogInMagicForm from "./LogInMagicForm";
import SingUpForm from "./SingUpForm";
import st from "../style/Modal.module.scss";

const Modal = ({setUserLogIn}) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  return (
    <div className={st.modal}>
      <div className={st.modal__content}>
        <div className={st.login__form}>
          <span className={st.log}>LOGIN</span>
          <LogInForm
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userPass={userPass}
            setUserPass={setUserPass}
            setUserLogIn={setUserLogIn}
          />
          <LogInMagicForm userEmail={userEmail} setUserEmail={setUserEmail} />
          <span className="not_avtor">Haven't you got an account yet?</span>
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
    </div>
  );
};

export default Modal;
