import { createContext } from "react";

const Context = createContext({
  currentUser: null,
  isAuth: false,
  onts: [],
});

export default Context;
