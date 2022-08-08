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
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MyButton from "./UI/MyButton";



function App() {
  const [notes, setNotes] = useState([]);
  const [bodyNote, setBodyNote] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const filteredNotes = useSearch(notes, searchTag); //хук поиска тегов
  const [notesLoading, setNotesLoading] = useState(false);
  const [logInLoading, setLogInLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [userLogIn, setUserLogIn] = useState(userLog);

  useEffect(() => {
    async function log() {
      (await userLogIn) ? setLogInLoading(true) : setLogInLoading(false);
    }
    log();
  }, [userLogIn]);

  console.log(showModal);

  useEffect(() => {
    userLog ? getNote(setNotes, setNotesLoading) : setLogInLoading(false);
  }, []);

  return (
    <div className="App">
      <CSSTransition
        in={showModal}
        timeout={200}
        classNames="modal"
        unmountOnExit
        onEnter={() => setShowModal(true)}
        onExited={() => setShowModal(false)}
      >
        <Modal
          className="modal"
          setLogInLoading={setLogInLoading}
          logInLoading={logInLoading}
          setUserLogIn={setUserLogIn}
        />
      </CSSTransition>

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
          <SearchInput value={searchTag} note={notes} onChange={setSearchTag} />
        )}
        <TransitionGroup className="list">
          {filteredNotes.map(({ bodyNote, id, tags, timeCreate }) => (
            <CSSTransition key={timeCreate} timeout={500} classNames="todo">
              <NoteItem
                className="todo"
                edit={updateNote}
                note={searchTag}
                deleteNote={() => deleteNote(id, setNotes, notes)}
                bodyNote={bodyNote}
                id={id}
                tag={tags}
                timeCreate={timeCreate}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}

export default App;
