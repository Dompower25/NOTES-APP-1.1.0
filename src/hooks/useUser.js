import { createContext, useCallback, useState } from "react";
import { getLastUser, LogIn, LogInMagic, LogOut } from "../processes/supabase";

export const UserContext = createContext([]);
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(getLastUser);

  const onLogin = useCallback((email, pass) => {
    LogIn(email, pass)
      .then((user) => {
        setUser(user);
      })
      .finally(() => {});
  }, []);

  const onLogInMagic = useCallback((email) => {
    LogInMagic(email)
      .then((user) => {
        setUser(user);
      })
      .finally(() => {});
  }, []);

  const onLogOut = useCallback(() => {
    setUser(null);
    LogOut();
  }, []);

  return (
    <UserContext.Provider value={[user, onLogin, onLogInMagic, onLogOut]}>
      {children}
    </UserContext.Provider>
  );
}
