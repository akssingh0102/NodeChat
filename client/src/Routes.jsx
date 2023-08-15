/* eslint-disable no-unused-vars */

import { useContext } from "react";
import Register from "./Register";
import { UserContext } from "./UserContext";

export default function Routes() {
  const { username, id } = useContext(UserContext);
  if (username) {
    return <div className="text-center"> Logged In {username}</div>;
  }
  return <Register />;
}
