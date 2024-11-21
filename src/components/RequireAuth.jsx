import React, { useContext, useEffect, useState } from "react";
import { loggedinContext } from "../store/loggedinContext";
import axios from "axios";

const RequireAuth = (props) => {
  const { loggedin } = useContext(loggedinContext);
  const { setLoggedin } = useContext(loggedinContext);

  const checkAuth = async () => {
    try {
      await axios.get(
        "https://full-stack-todo-server.onrender.com/check-auth",
        {
          withCredentials: true,
        }
      );
      setLoggedin(true);
      //   console.log("checking sucess and loggedin is", loggedin);
      //   console.log(res);
    } catch (error) {
      setLoggedin(false);
      console.log("need to to log in");
    }
  };
  useEffect(() => {
    // console.log("is loggedin null", loggedin == null);
    if ((loggedin == null) | (loggedin == false)) {
      checkAuth();
    }
  }, []);

  //   console.log("login auth", loggedin);
  if (!loggedin) {
    return <>Please login!!</>;
  }

  return <div>{props.children}</div>;
};

export default RequireAuth;
