import React, { useState, useEffect, useContext } from "react";
import "./app/style/App.scss";
import { useSearch } from "./hooks/useSearch";
import HeaderForm from "./components/Header/HeaderForm";
import Loader from "./UI/loader/Loader";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import st from "./components/Modal/Modal.module.scss";
import Modal from "./components/Modal/Modal";
import { UserContext } from "./hooks/useUser";
import LogInForm from "./components/LoginForm/LogInForm";
import SingUpForm from "./components/SingUpForm/SingUpForm";
import NotesForm from "./components/Note/NotesForm";
import SearchInput from "./components/Note/SearchInput";
import NoteItem from "./components/Note/NoteItem";
import { NotesContext } from "./hooks/useNote";

function App() {
  const [user] = useContext(UserContext);
  const [notes] = useContext(NotesContext);
  const [searchTag, setSearchTag] = useState("");
  const filteredNotes = useSearch(notes || [], searchTag); //хук поиска тегов

  const [showAuth, setShowAuth] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);

  const [showModal, setShowModal] = useState(true);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    user ? setShowModal(false) : setShowModal(true);
  }, [user]);

  return (
    <div className="App">
      {showContent && (
        <div className="notes__app">
          <HeaderForm setShowContent={setShowContent} />
          <h1>NOTES APP</h1>
          <NotesForm />
          <hr></hr>
          {notes ? (
            <SearchInput value={searchTag} onChange={setSearchTag} />
          ) : (
            <Loader />
          )}
          <TransitionGroup className="list">
            {filteredNotes.map(({ text, tags, creationDate, noteId }) => (
              <CSSTransition
                key={creationDate}
                timeout={500}
                classNames="noteList"
              >
                <NoteItem
                  key={creationDate}
                  className="noteList"
                  note={searchTag}
                  bodyNote={text}
                  id={noteId}
                  tag={tags}
                  timeCreate={creationDate}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      )}
      <CSSTransition
        in={showModal}
        timeout={450}
        classNames="modal"
        unmountOnExit
        onEnter={() => setShowContent(false)}
        onExited={() => setShowContent(true)}
      >
        <Modal className="modal">
          <div className={st.login__form}>
            {showAuth && (
              <div>
                <span className={st.log}>LOGIN</span>
                <LogInForm />
                <button
                  className="not_autorisation"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowRegistration(true);
                  }}
                >
                  Haven't you got an account yet?
                </button>
              </div>
            )}
            <CSSTransition
              in={showRegistration}
              timeout={250}
              classNames="register__form"
              unmountOnExit
              onEnter={() => setShowAuth(false)}
              onExited={() => setShowAuth(true)}
            >
              <div className="register__form">
                <span className={st.log}>REGISTRATION</span>
                <SingUpForm setShowRegistration={setShowRegistration} />
              </div>
            </CSSTransition>
          </div>
        </Modal>
      </CSSTransition>
    </div>
  );
}

export default App;
