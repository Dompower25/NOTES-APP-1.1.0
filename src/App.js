import React, { useState, useEffect } from "react";
import NoteItem from "./components/NoteItem";
import NotesForm from "./components/NotesForm";
import SearchInput from "./components/SearchInput";
import "./style/App.scss";
import { useSearch } from "./hooks/useSearch";
import { userLog } from "./supabase";
import { getNote, insertNote, deleteNote, updateNote } from "./notes";
import HeaderForm from "./components/HeaderForm";
import Modal from "./components/Modal";
import Loader from "./UI/loader/Loader";

function App() {
  const [notes, setNotes] = useState([]);
  const [bodyNote, setBodyNote] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const filteredNotes = useSearch(notes, searchTag); //хук поиска тегов
  const [notesLoading, setNotesLoading] = useState(false);
  const [logInLoading, setLogInLoading] = useState(false);
  const [userLogIn, setUserLogIn] = useState(userLog);

  useEffect(() => {
    async function log() {
      (await userLogIn) ? setLogInLoading(true) : setLogInLoading(false);
      console.log(userLogIn);
    }
    log();
  }, [userLogIn]);

  useEffect(() => {
    userLog ? getNote(setNotes, setNotesLoading) : setLogInLoading(false);
    console.log(userLog);
  }, []);

  return (
    <div className="App">
      {logInLoading ? (
        <div className="notes__app">
          <HeaderForm setLogInLoading={setLogInLoading} />
          <h1>NOTES APP</h1>
          <NotesForm //форма создания заметки
            bodyNote={bodyNote}
            setbodyNote={setBodyNote}
            notes={notes}
            setNotes={setNotes}
            insertNote={insertNote}
          />
          <hr></hr>
          {notesLoading ? (
            <Loader />
          ) : (
            <SearchInput
              value={searchTag}
              note={notes}
              onChange={setSearchTag}
            />
          )}
          {filteredNotes.map(({ bodyNote, id, tags, timeCreate }) => (
            <NoteItem
              edit={updateNote}
              note={searchTag}
              deleteNote={() => deleteNote(id, setNotes, notes)}
              bodyNote={bodyNote}
              id={id}
              tag={tags}
              key={timeCreate}
              timeCreate={timeCreate}
            />
          ))}
        </div>
      ) : (
        <Modal
          setLogInLoading={setLogInLoading}
          logInLoading={logInLoading}
          setUserLogIn={setUserLogIn}
        />
      )}
    </div>
  );
}

export default App;
