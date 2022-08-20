import { createClient } from "@supabase/supabase-js";
export { getNote, insertNote, deleteNote, updateNote };
const SUPABASE_URL = "https://obbgzeamtcqhzsiwmktq.supabase.co";
const supabase = createClient(
  SUPABASE_URL,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYmd6ZWFtdGNxaHpzaXdta3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUyOTE4OTEsImV4cCI6MTk3MDg2Nzg5MX0.Y5_Qju8baHUSW6JFK62TgK4vlFF-tHBafrSYSU0gJ4w"
);

async function getNote(user) {
  try {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user?.id);
    return data;
  } catch (error) {
    throw error;
  }
}

// добавление заметки supabase
async function insertNote(newNote) {
  try {
    const { data, error } = await supabase.from("notes").insert(newNote);
  } catch (err) {
    throw err;
  }
}

//удаление заметки supabase
async function deleteNote(id) {
  try {
    const { data, error } = await supabase.from("notes").delete().eq("id", id);
  } catch (error) {
    throw error;
  }
}

//редактирование заметки supabase
async function updateNote(newText, tags, id) {
  try {
    const { data, error } = await supabase
      .from("notes")
      .update({
        bodyNote: newText,
        tags: tags,
      })
      .eq("id", id);
  } catch (error) {
    throw error;
  }
}
