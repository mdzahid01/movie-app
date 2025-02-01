import React, { useState, useEffect } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

function Main() {
  const getSystemDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)')
 // console.log(getSystemDarkMode()) //returns true if darkmode is on
  const [darkMode, setDarkMode] = useState(getSystemDarkMode());

  useEffect(() => {
    // Apply dark or light mode to the entire body when darkMode changes
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-light");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, [darkMode]);

  return (
    <Router>
      <div>
        <div className="container mt-4">
          <h2 className="text-center mb-4">🎬 Movie App</h2>

          {/* Dark/Light Mode Toggle */}
          <div className="text-center mb-4">
            <button
              className={`btn ${darkMode ? "btn-light" : "btn-dark"}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>

          {/* Pass darkMode to App Component */}
          <App darkMode={darkMode} />
        </div>
      </div>
    </Router>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
