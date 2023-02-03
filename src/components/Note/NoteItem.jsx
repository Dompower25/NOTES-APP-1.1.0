import { IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import { useCallback } from "react";
import { NotesContext } from "../../hooks/useNote";
import MyButton from "../../UI/button/MyButton";
import st from "./NoteItem.module.scss";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

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
      onDeleteNote(id);
    },
    [id, onDeleteNote]
  );

  const onUpdateClick = useCallback(
    (e) => {
      onUpdateNote(state, id);
      setEditNode(true);
      setEditButt("none");
    },
    [state, id, onUpdateNote]
  );

  return (
    <div className={st.note__box}>
      <div className={st.note__content}>
        <div className={st.pr}>
          <CloseRoundedIcon
            fontSize="medium"
            onClick={onDeleteClick}
            className={st.closeBtn}
          />
          {editNote ? (
            <div
              className={st.noteBox}
              onClick={() => {
                setEditNode(false);
                setEditButt("inline-block");
              }}
            >
              {state}
            </div>
          ) : (
            <textarea
              disabled={editNote}
              onChange={(e) => {
                setState(e.target.value);
                if (e.target.scrollTop > 0) {
                  e.target.style.height = e.target.scrollHeight + "px";
                }
              }}
              className={st.noteInput}
              value={state}
            ></textarea>
          )}
          <MyButton style={{ display: editButt }} onClick={onUpdateClick}>
            Save
          </MyButton>
        </div>

        <div className="tegs__box row">
          <div>
            {stateTag.map((t) => (
              <span className={note === t ? st.blue : "tegSt"} key={t}>
                {t + " "}
              </span>
            ))}
          </div>
          <div className={st.text}>{time}</div>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
