/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";

export default function RegisterAndLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = isLoginOrRegister === "register" ? "register" : "login";
    const response = await axios.post(`/${url}`, { username, password });

    const { data } = response.data;
    setLoggedInUsername(username);
    setId(data.id);
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div>
              Already a member?
              <button
                onClick={() => {
                  setIsLoginOrRegister("login");
                }}
                href=""
              >
                Login here
              </button>
            </div>
          )}

          {isLoginOrRegister === "login" && (
            <div>
              Don&#39;t have an account?
              <button
                onClick={() => {
                  setIsLoginOrRegister("register");
                }}
                href=""
              >
                Register here
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
