import React, { useContext, useState } from "react";
import { useCallback } from "react";
import { NotesContext } from "../../hooks/useNote";
import MyButton from "../../UI/button/MyButton";
import st from "./NoteItem.module.scss";

function NoteItem({ bodyNote, tag, note, timeCreate, id }) {
  const maxDate = new Date(timeCreate);
  const time = maxDate.toLocaleString();
  const [state, setState] = useState(bodyNote);
  const [stateTag, setStateTag] = useState(tag);

  const [editNote, setEditNode] = useState(true);
  const [editButt, setEditButt] = useState("none");

  const [, , , onDeleteNote, onUpdateNote] = useContext(NotesContext);

  const onDeleteClick = useCallback(
    (e) => {
      e.preventDefault();
      onDeleteNote(id);
    },
    [id, onDeleteNote]
  );

  const onUpdateClick = useCallback(
    (e) => {
      e.preventDefault();
      onUpdateNote(state, id);
      setEditNode(true);
      setEditButt("none");
    },
    [state, id, onUpdateNote]
  );

  return (
    <div className="note__box">
      <div className="note__content">
        <div>
          <textarea
            disabled={editNote}
            onChange={(e) => {
              setState(e.target.value);
            }}
            className={st.note}
            value={state}
          ></textarea>
          <div className="tegs__box row">
            <div>
              {stateTag.map((t) => (
                <span className={note === t ? st.blue : "tegSt"} key={t}>
                  {t + " "}
                </span>
              ))}
            </div>
            <span>{time}</span>
          </div>
        </div>
        <div className="note__btn">
          <MyButton onClick={onDeleteClick}>Delete</MyButton>
          <MyButton
            style={{ display: "inline-block" }}
            onClick={() => {
              setEditNode(false);
              setEditButt("inline-block");
            }}
          >
            Edit
          </MyButton>
          <MyButton
            style={{ display: editButt, backgroundColor: "green" }}
            onClick={onUpdateClick}
          >
            Save
          </MyButton>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
