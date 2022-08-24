import { createContext, useCallback, useState } from "react";
import { getLastUser, logIn, logInMagic, logOut } from "../processes/supabase";

export const UserContext = createContext([]);
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(getLastUser);
  const [errors, setErrors] = useState("");
  const [spinner, setSpinner] = useState(false);

  const onLogIn = useCallback((email, pass) => {
    setSpinner(true);
    logIn(email, pass)
      .then(({ user, error }) => {
        setUser(user);
        if (error) {
          setErrors(error.message);
        }
      })
      .finally(() => {
        setSpinner(false);
      });
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
    <UserContext.Provider
      value={[user, onLogIn, onLogInMagic, onLogOut, errors, spinner]}
    >
      {children}
    </UserContext.Provider>
  );
}
