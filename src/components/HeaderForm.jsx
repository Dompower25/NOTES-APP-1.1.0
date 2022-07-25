import React, { useEffect, useState } from "react";
import { LogOut, userLog, supabase } from "../supabase";
import MyButton from "../UI/MyButton";


const HeaderForm = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(userLog?.email);
  }, []);

  return (
    <div className="header row modile">
      <h5 className="user__name">{userName}</h5>
      <MyButton onClick={LogOut}>выйти</MyButton>
    </div>
  );
};

export default HeaderForm;
