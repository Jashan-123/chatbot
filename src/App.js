import React, { useState } from "react";
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
  console.log(loggedIn);

  const handleLogin = () => {
    setLoggedIn(true);
    console.log(loggedIn);
  };
  return (
    <Router>
      <Routes>
        <Route exact index path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/chatbot"
          element={loggedIn ? <Chatbot /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};
export default App;
