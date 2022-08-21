export const createNewNote = (() => {
  const regex = /#\w+/gm;
  const getTags = (text) => text.match(regex) ?? [];

  return ({ user, text, tags, creationDate }) => {
    if (user?.id === undefined) {
      throw new Error("User ID undefined");
    }
    return {
      user_id: user?.id,
      text: text ?? "",
      tags: tags ?? getTags(text),
      creationDate: creationDate ?? Date.now(),
    };
  };
})();
