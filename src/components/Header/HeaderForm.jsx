import React, { useCallback, useContext } from "react";
import { UserContext } from "../../hooks/useUser";
import MyButton from '../../UI/button/MyButton'
import "./HeaderForm.Module.scss";

const HeaderForm = () => {
  const [user, , , onLogOut] = useContext(UserContext);

  const onCLick = useCallback(
    (e) => {
      e.preventDefault();
      onLogOut();
    },
    [onLogOut]
  );

  return (
    <div className="header">
      <h5 className="user__name">{user?.email ?? "Login filed"}</h5>
      <MyButton onClick={onCLick}>EXIT</MyButton>
    </div>
  );
};

export default HeaderForm;
