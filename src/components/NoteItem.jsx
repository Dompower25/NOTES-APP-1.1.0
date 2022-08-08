import React, { useState } from "react";
import MyButton from "../UI/MyButton";
import st from "../style/NoteItem.module.scss";

function NoteItem({ bodyNote, tag, note, edit, timeCreate, deleteNote, id }) {
  const maxDate = new Date(timeCreate);
  const time = maxDate.toLocaleString();
  const [state, setState] = useState(bodyNote);
  const [stateTag, setStateTag] = useState(tag);
  const [editNote, setEditNode] = useState(true);
  const [editButt, setEditButt] = useState("none");
  
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
          <MyButton onClick={deleteNote}>
            Delete
          </MyButton>
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
            onClick={() => {
              edit(state, id, setStateTag);
              setEditNode(true);
              setEditButt("none");
            }}
          >
            Save
          </MyButton>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
