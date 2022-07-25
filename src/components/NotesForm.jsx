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
          placeholder="создайте заметку"
        ></MyInput>
        <MyButton
          onClick={(e) => {
            insertNote(e, bodyNote, setbodyNote, setNotes);
          }}
        >
          добавить заметку
        </MyButton>
      </form>
    </div>
  );
};

export default NotesForm;