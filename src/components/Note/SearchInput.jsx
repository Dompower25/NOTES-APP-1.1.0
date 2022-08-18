import React from 'react'

const SearchInput = ({ note, onChange, value }) => {
  return (
    <div className="row search__line row__mobile">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search"
        placeholder="Search #tag"
      ></input>
      {note.length !== 0 ? (
        <h2 style={{ textAlign: "center" }}>Notes list</h2>
      ) : (
        <h2 style={{ textAlign: "center" }}>No notes</h2>
      )}
    </div>
  );
};

export default SearchInput