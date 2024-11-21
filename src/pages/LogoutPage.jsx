import React, { useContext, useEffect } from "react";
import { loggedinContext } from "../store/loggedinContext";
import axios from "axios";

const LogoutPage = () => {
  const { setLoggedin } = useContext(loggedinContext);
  const logout = async () => {
    await axios.get("https://full-stack-todo-server.onrender.com/logout", {
      withCredentials: true,
    });
    setLoggedin(false);
  };
  useEffect(() => {
    logout();
  }, []);
  return <div>LogoutPage</div>;
};

export default LogoutPage;
