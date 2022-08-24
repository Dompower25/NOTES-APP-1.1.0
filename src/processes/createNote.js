export const createNewNote = (() => {
  const regex = /#[\wа-яё]+/gm;
  const getTags = (text) => text.match(regex) ?? [];

  return ({ user, text, tags, creationDate, noteId }) => {
    if (user?.id === undefined) {
      throw new Error("User ID undefined");
    }
    return {
      user_id: user?.id,
      text: text ?? "",
      tags: tags ?? getTags(text),
      creationDate: creationDate ?? Date.now(),
      noteId: Date.now(),
    };
  };
})();
