import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NotesPage from "./pages/NotesPage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/RequireAuth";
import { loggedinContext } from "./store/loggedinContext";
import SignupPage from "./pages/SignupPage";
import LogoutPage from "./pages/LogoutPage";
const App = () => {
  const [loggedin, setLoggedin] = useState(null);

  // console.log("login status", loggedin);

  return (
    <div>
      <loggedinContext.Provider value={{ loggedin, setLoggedin }}>
        <BrowserRouter>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
          <Routes>
            <Route
              index
              element={
                <RequireAuth>
                  <NotesPage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </BrowserRouter>
      </loggedinContext.Provider>
    </div>
  );
};

export default App;
