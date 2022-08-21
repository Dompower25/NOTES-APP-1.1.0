import React, { useCallback, useContext, useState } from "react";
import { NotesContext } from "../../hooks/useNote";
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/Input/MyInput";

const NotesForm = () => {
  const [bodyNote, setBodyNote] = useState("");
  const [, , onInsertNote] = useContext(NotesContext);

  const onAddNoteClick = useCallback(
    (e) => {
      e.preventDefault();
      onInsertNote(bodyNote);
      setBodyNote("");
    },
    [bodyNote, onInsertNote]
  );

  return (
    <div className="row_column">
      <form>
        <MyInput
          value={bodyNote}
          onChange={(event) => setBodyNote(event.target.value)}
          type="text"
          placeholder="Create note"
        ></MyInput>
        <MyButton onClick={onAddNoteClick}>Add a note</MyButton>
      </form>
    </div>
  );
};

export default NotesForm;
