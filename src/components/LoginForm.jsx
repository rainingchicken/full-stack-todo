import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RequireAuth from "./RequireAuth";
import LoginPage from "../pages/LoginPage";
import { loggedinContext } from "../store/loggedinContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { setLoggedin } = useContext(loggedinContext);
  const { loggedin } = useContext(loggedinContext);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const updateLoginForm = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://full-stack-todo-server.onrender.com/login",
      loginForm,
      {
        withCredentials: true,
      }
    );

    // setLoggedin(true);
    setLoginForm({
      email: "",
      password: "",
    });
    navigate("/");
  };

  // const checkAuth = async () => {
  //   console.log("checking");
  //   try {
  //     setLoggedin(true);
  //   } catch (error) {
  //     setLoggedin(false);
  //     console.log("cant checkauth");
  //   }
  // };
  // useEffect(() => {
  //   if (loggedin === null) {
  //     checkAuth();
  //   }
  // }, []);
  return (
    <form onSubmit={login}>
      <input
        onChange={updateLoginForm}
        value={loginForm.email}
        type="email"
        name="email"
      />
      <input
        onChange={updateLoginForm}
        value={loginForm.password}
        type="password"
        name="password"
      />
      <input type="submit" value="LOGIN" />
    </form>
  );
}
