import React, { useContext } from "react";
import { NotesContext } from "../../hooks/useNote";
import Loader from "../../UI/loader/Loader";

const SearchInput = ({ onChange, value }) => {
  const [notes] = useContext(NotesContext);
  return (
    <div className="row search__line">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search"
        placeholder="Search #tag"
      ></input>
      {notes?.length !== 0 ? (
        <h2 style={{ textAlign: "center" }}>Notes list</h2>
      ) : (
        <h2 style={{ textAlign: "center" }}>No notes</h2>
      )}
    </div>
  );
};

export default SearchInput;
