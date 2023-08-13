/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext } from "react";
import Register from "./Register";
import { UserContext, UserContextProvider } from "./UserContext";

function App() {
  axios.defaults.baseURL = "http://localhost:4040";
  axios.defaults.withCredentials = true;
  const { username } = useContext(UserContext);

  return (
    <UserContextProvider>
      <Register />
    </UserContextProvider>
  );
}

export default App;
