import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createNewNote } from "../processes/createNote";
import {
  deleteNote,
  getNote,
  insertNote,
  updateNote,
} from "../processes/notes";
import { UserContext } from "./useUser";

export const NotesContext = createContext([]);
export function NotesContextProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [user] = useContext(UserContext);

  //get notes from API
  const onGetNotes = useCallback(() => {
    getNote(user).then((data) => {
      setNotes(data);
    });
  }, [user]);

  //add note
  const onInsertNote = useCallback(
    (text) => {
      const newNote = createNewNote({ user, text });
      setNotes((note) => {
        return [newNote, ...note];
      });
      insertNote(newNote);
      console.log(newNote);
    },
    [user]
  );

  //delete note
  const onDeleteNote = useCallback(
    (id) => {
      deleteNote(id);
      setNotes(notes.filter((i) => i.noteId !== id));
    },
    [notes]
  );

  //update note
  const onUpdateNote = useCallback(
    (text, id) => {
      const updatedNote = createNewNote({ user, text });
      updateNote(updatedNote, id);
    },
    [user]
  );

  useEffect(() => {
    if (user) {
      onGetNotes();
    }
  }, [user, onGetNotes]);

  return (
    <NotesContext.Provider
      value={[notes, onGetNotes, onInsertNote, onDeleteNote, onUpdateNote]}
    >
      {children}
    </NotesContext.Provider>
  );
}
