import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const [signupForm, setsignupForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const updatesignupForm = (e) => {
    const { name, value } = e.target;
    setsignupForm({
      ...signupForm,
      [name]: value,
    });
  };
  const signup = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://full-stack-todo-server.onrender.com/signup",
      signupForm,
      {
        withCredentials: true,
      }
    );
    console.log(signupForm);
    setsignupForm({
      email: "",
      password: "",
    });
    navigate("/login");
  };

  return (
    <form onSubmit={signup}>
      <input
        onChange={updatesignupForm}
        value={signupForm.email}
        type="email"
        name="email"
      />
      <input
        onChange={updatesignupForm}
        value={signupForm.password}
        type="password"
        name="password"
      />
      <input type="submit" value="signup" />
    </form>
  );
};

export default SigninForm;
