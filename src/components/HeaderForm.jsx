import React, { useEffect, useState } from "react";
import { LogOut, userLog, supabase } from "../supabase";
import MyButton from "../UI/MyButton";

const HeaderForm = ({ setLogInLoading, setShowModal, userLogIn }) => {
  const [userName, setUserName] = useState("login failed");

  useEffect(() => {
    setUserName(userLogIn?.email);
  }, [userLogIn]);

  return (
    <div className="header">
      <h5 className="user__name">{userName}</h5>
      <MyButton
        onClick={() => {
          LogOut();
          setLogInLoading(false);
          setShowModal(true);
        }}
      >
        EXIT
      </MyButton>
    </div>
  );
};

export default HeaderForm;
