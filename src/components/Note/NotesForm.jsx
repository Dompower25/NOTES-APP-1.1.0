import React, { useContext, useState } from "react";
import { UserContext } from "../../hooks/useUser";
import { insertNote } from "../../processes/notes";
import MyButton from "../../UI/button/MyButton";
import MyInput from "../../UI/Input/MyInput";


const NotesForm = () => {
  const [bodyNote, setBodyNote] = useState("");

  const [user] = useContext(UserContext);

  return (
    <div className="row_column">
      <form>
        <MyInput
          value={bodyNote}
          onChange={(event) => setBodyNote(event.target.value)}
          type="text"
          placeholder="Create note"
        ></MyInput>
        <MyButton
          onClick={(e) => {
            e.preventDefault();
            user?.id &&
              insertNote(bodyNote, user.id).then(() => {
                setBodyNote("");
              });
          }}
        >
          Add a note
        </MyButton>
      </form>
    </div>
  );
};

export default NotesForm;
