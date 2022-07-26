import React, { useState, useEffect } from "react";
import NoteItem from "./components/NoteItem";
import NotesForm from "./components/NotesForm";
import SearchInput from "./components/SearchInput";
import "./style/App.scss";
import { useSearch } from "./hooks/useSearch";
import { userLog, supabase } from "./supabase";
import { getNote, insertNote, deleteNote, updateNote } from "./notes";
import HeaderForm from "./components/HeaderForm";
import Modal from "./components/Modal";

function App() {
  const [notes, setNotes] = useState([]);
  const [bodyNote, setbodyNote] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const filteredNotes = useSearch(notes, searchTag); //хук поиска тегов

  // useEffect(() => {
  //   getNote(setNotes);
  // }, []);

  console.log(userLog);
  return (
    <div className="App">
      {userLog ? <HeaderForm /> : <Modal />}
      <div className="notes__app">
        <h1>NOTES APP</h1>
        <NotesForm //форма создания заметки
          bodyNote={bodyNote}
          setbodyNote={setbodyNote}
          notes={notes}
          setNotes={setNotes}
          insertNote={insertNote}
        />
        <hr></hr>
        <SearchInput value={searchTag} note={notes} onChange={setSearchTag} />
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
    </div>
  );
}

export default App;
