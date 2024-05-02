import React from "react";

const Typing = ({ theme }) => {
  return (
    <div className={`typing-indicator ${theme === "dark" ? "dark" : "light"}`}>
      <div className={`dot ${theme === "dark" ? "light" : "dark"}`}></div>
      <div className={`dot ${theme === "dark" ? "light" : "dark"}`}></div>
      <div className={`dot ${theme === "dark" ? "light" : "dark"}`}></div>
    </div>
  );
};

export default Typing;
