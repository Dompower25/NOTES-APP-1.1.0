import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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

  const onGetNotes = useCallback(() => {
    getNote(user).then((data) => {
      setNotes(data);
    });
  }, [user]);

  const onInsertNote = useCallback(
    (text) => {
      const addTags = (obj, text) => {
        const regex = /#\w+/gm;
        obj.tags = text.match(regex);
      };

      const textNotTags = (obj, text) => {
        return (obj.tags = [text]);
      };

      const newNote = {
        bodyNote: text,
        tags: [],
        timeCreate: Date.now(),
        user_id: user.id,
      };

      text.search(/#\w+/gm) !== -1
        ? addTags(newNote, text)
        : textNotTags(newNote, "no tags");

      let backup = [];
      setNotes((note) => {
        backup = note;
        return [...note, newNote];
      });

      insertNote(newNote);
    },
    [user]
  );

  const onDeleteNote = useCallback(
    (id) => {
      deleteNote(id);
      setNotes(notes.filter((i) => i.id !== id));
    },
    [notes]
  );

  const onUpdateNote = useCallback((newText, id) => {
    const newTags = (text) => {
      const tags = text.match(/#\w+/gm);
      return tags;
    };

    const getTag = (text) => {
      const searchTag =
        text.search(/#\w+/gm) !== -1 ? newTags(text) : ["no tags"];
      return searchTag;
    };
    const tags = getTag(newText);
    updateNote(newText, tags, id);
  }, []);

  useEffect(() => {
    if (user) {
      onGetNotes();
    }
  }, [user]);

  return (
    <NotesContext.Provider
      value={[notes, onGetNotes, onInsertNote, onDeleteNote, onUpdateNote]}
    >
      {children}
    </NotesContext.Provider>
  );
}
