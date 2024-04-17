import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login, Chatbot } from "./component";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("currentTheme"));
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("currentTheme", JSON.stringify(newTheme));
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };
  return (
    <Router>
      <Routes>
        <Route exact index path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/chatbot"
          element={
            loggedIn ? (
              <Chatbot theme={theme} handleToggle={handleToggle} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
