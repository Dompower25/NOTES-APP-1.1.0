import React, { useState } from "react";
import st from "../style/Modal.module.scss";

const Modal = ({children}) => {

  return (
    <div className={st.modal}>
      <div className={st.modal__content}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
