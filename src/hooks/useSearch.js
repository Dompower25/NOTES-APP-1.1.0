import { useMemo } from "react";

export const useSearch = (notes, searchTag) => {
  const searchTags = useMemo(() => {
    if (searchTag) {
      return notes.filter((notes) => notes.tags.includes(searchTag));
    }
    return notes;
  }, [searchTag, notes]);

  return searchTags;
};
