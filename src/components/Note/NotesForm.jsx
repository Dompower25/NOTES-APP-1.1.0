import React, { useCallback, useContext, useState } from "react";
import s from "./NotesForm.module.scss";
import { NotesContext } from "../../hooks/useNote";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

const NotesForm = () => {
  const [bodyNote, setBodyNote] = useState(null || "");
  const [, , onInsertNote] = useContext(NotesContext);

  const getBody = document.querySelector("body");

  const onAddNoteClick = useCallback(
    (e) => {
      if (bodyNote) {
        e.preventDefault();
        onInsertNote(bodyNote);
        setBodyNote("");
      }
    },
    [bodyNote, onInsertNote]
  );

  return (
    <div className="row_column">
      <form>
        <textarea
          className={s.input}
          value={bodyNote}
          onChange={(event) => {
            setBodyNote(event.target.value);
            if (event.target.scrollTop) {
              event.target.style.height = event.target.scrollHeight + "px";
            }
          }}
          placeholder="Create note"
        ></textarea>
        <IconButton onClick={onAddNoteClick}>
          <AddIcon fontSize="large" className="addBtn" />
        </IconButton>
      </form>
    </div>
  );
};

export default NotesForm;
