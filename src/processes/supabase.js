import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://obbgzeamtcqhzsiwmktq.supabase.co";
const supabase = createClient(
  SUPABASE_URL,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iYmd6ZWFtdGNxaHpzaXdta3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUyOTE4OTEsImV4cCI6MTk3MDg2Nzg5MX0.Y5_Qju8baHUSW6JFK62TgK4vlFF-tHBafrSYSU0gJ4w"
);

const getLastUser = () => {
  return supabase.auth.user();
};

const errorOutput = () => {};

async function singUp(email, pass) {
  try {
    let { user, error } = await supabase.auth.signUp({
      email: email,
      password: pass,
    });
    return { user: user, error: error };
  } catch (error) {
    throw new Error("Something went wrong", error);
  }
}

async function logIn(email, pass) {
  try {
    let { user, error } = await supabase.auth.signIn({
      email: email,
      password: pass,
    });
    return user;
  } catch (error) {}
}

async function logInMagic(email) {
  //Не используется в данной версии приложения
  try {
    let { user, error } = await supabase.auth.signIn({
      email: email,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function logOut() {
  try {
    let { error } = await supabase.auth.signOut();
    console.log(error);
  } catch (error) {
    throw error;
  }
}

export {
  singUp,
  logInMagic,
  logIn,
  logOut,
  getLastUser,
  supabase,
  errorOutput,
};
