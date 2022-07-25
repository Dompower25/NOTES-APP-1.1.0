import React, { useState, useEffect } from "react";
import NoteItem from "./components/NoteItem";
import NotesForm from "./components/NotesForm";
import SearchInput from "./components/SearchInput";
import "./style/App.scss";
import { useSearch } from "./hooks/useSearch";
import { LogOut, userLog, supabase } from "./supabase.js";
import SingUpForm from "./components/SingUpForm";
import LogInMagicForm from "./components/LogInMagicForm";
import LogInForm from "./components/LogInForm";
import {
  addTags,
  textNotTags,
  addNewNote,
  editNotes,
  removeNote,
  fetchNotes,
} from "./notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [bodyNote, setbodyNote] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const filteredNotes = useSearch(notes, searchTag); //хук поиска тегов
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchNotes(setNotes);
    setUserName(userLog?.email);
  }, []);

  // добавление заметки supabase
  async function insertNote(e, newText) {
    e.preventDefault();
    const newNote = {
      bodyNote: newText,
      tags: [],
      timeCreate: Date.now(),
      user_id: userLog?.id,
    };
    newText.search(/#\w+/gm) !== -1
      ? addTags(newNote, newText)
      : textNotTags("no tags", newNote);

    let backup = [];
    setNotes((note) => {
      backup = note;
      return [...note, newNote];
    });

    try {
      const { data, error } = await supabase.from("notes").insert(newNote);
    } catch (err) {
      setNotes(backup);
      throw err;
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h5>{userName}</h5>

        <button onClick={LogOut}>выйти</button>

        <SingUpForm
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userPass={userPass}
          setUserPass={setUserPass}
        ></SingUpForm>

        <LogInMagicForm
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        ></LogInMagicForm>

        <LogInForm
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userPass={userPass}
          setUserPass={setUserPass}
        ></LogInForm>
      </div>

      <h1>NOTES APP</h1>
      <NotesForm //форма создания заметки
        bodyNote={bodyNote}
        setbodyNote={setbodyNote}
        addNewNote={addNewNote}
        notes={notes}
        setNotes={setNotes}
        insertNote={insertNote}
      />
      <hr></hr>
      <SearchInput value={searchTag} note={notes} onChange={setSearchTag} />
      {filteredNotes.map(({ bodyNote, id, tags, timeCreate }) => (
        <NoteItem
          edit={(e) => {
            editNotes(e, timeCreate, id);
          }}
          note={searchTag}
          deleteNote={() => removeNote(id, setNotes, notes)}
          bodyNote={bodyNote}
          id={id}
          tag={tags}
          key={timeCreate}
          timeCreate={timeCreate}
        />
      ))}
    </div>
  );
}

export default App;
