export { addNewNote, addTags, textNotTags, editNotes, removeNote, fetchNotes };

const axios = require("axios");

  async function fetchNotes(setNotes) {
    await axios
      .get("https://62ab026ea62365888bd2271d.mockapi.io/Notes/")
      .then((res) => {
        return setNotes(res.data);
      });
  }

//добавление тегов в заметку
const addTags = (obj, text) => {
  const regex = /#\w+/gm;
  obj.tags = text.match(regex);
};

const textNotTags = (text, obj) => {
  return (obj.tags = [text]);
};

//создание новой заметки
const addNewNote = (e, bodyNote, setNotes, setbodyNote) => {
  e.preventDefault();
  const newNote = {
    id: Number,
    bodyNote,
    tegs: [],
    timeCreate: Date.now(),
  };

  bodyNote.search(/#\w+/gm) !== -1
    ? addTags(newNote, bodyNote)
    : textNotTags("no tags", newNote);

  let backup = [];
  setNotes((note) => {
    backup = note;
    return [...note, newNote];
  });

  axios
    .post("https://62ab026ea62365888bd2271d.mockapi.io/Notes/", newNote)
    .then((response) => {
      console.log("Create note", response.data);
    })
    .catch((err) => {
      console.log(err);
      setNotes(backup);
    });
  setbodyNote("");
};

//удаление заметки
const removeNote = (id, setNotes, notes) => {
  setNotes(notes.filter((i) => i.id !== id));
  axios
    .delete(`https://62ab026ea62365888bd2271d.mockapi.io/Notes/${id}`)
    .then((response) => console.log("Delete note", response.data))
    .catch((err) => console.log(err));
};

//редактирование заметки
const editNotes = (newText, timeCreate, id) => {
  const newNote = {
    id: id,
    bodyNote: newText,
    tegs: [],
    timeCreate: timeCreate,
  };

  newText.search(/#\w+/gm) !== -1
    ? addTags(newNote, newText)
    : textNotTags("no tags", newNote);

  axios
    .put(`https://62ab026ea62365888bd2271d.mockapi.io/Notes/${id}`, newNote)
    .then((response) => {
      console.log("Заметка изменена", response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
