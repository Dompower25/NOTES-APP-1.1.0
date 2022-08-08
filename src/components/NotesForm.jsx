import React from "react";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";

const NotesForm = ({
  bodyNote,
  setbodyNote,
  setNotes,
  insertNote,
}) => {
  return (
    <div className="row_column">
      <form>
        <MyInput
          value={bodyNote}
          onChange={(event) => setbodyNote(event.target.value)}
          type="text"
          placeholder="Create note"
        ></MyInput>
        <MyButton
          onClick={(e) => {
            insertNote(e, bodyNote, setbodyNote, setNotes);
          }}
        >
          Add a note
        </MyButton>
      </form>
    </div>
  );
};

export default NotesForm;