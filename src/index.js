import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotesContextProvider } from "./hooks/useNote";
import { UserContextProvider } from "./hooks/useUser";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserContextProvider>
    <NotesContextProvider>
      <App />
    </NotesContextProvider>
  </UserContextProvider>
);
