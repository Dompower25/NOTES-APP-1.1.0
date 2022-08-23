import { createContext, useCallback, useState } from "react";
import { getLastUser, logIn, logInMagic, logOut } from "../processes/supabase";

export const UserContext = createContext([]);
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(getLastUser);

  const onLogin = useCallback((email, pass) => {
    logIn(email, pass)
      .then((user) => {
        setUser(user);
      })
      .finally(() => {});
  }, []);

  const onLogInMagic = useCallback((email) => {
    logInMagic(email)
      .then((user) => {
        setUser(user);
      })
      .finally(() => {});
  }, []);

  const onLogOut = useCallback(() => {
    setUser(null);
    logOut();
  }, []);

  return (
    <UserContext.Provider value={[user, onLogin, onLogInMagic, onLogOut]}>
      {children}
    </UserContext.Provider>
  );
}
