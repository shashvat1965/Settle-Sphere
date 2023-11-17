import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextWrapper from "./context/ContextWrapper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Widget from "./Widget.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/widget" element={<Widget />} />
        </Routes>
      </Router>
    </ContextWrapper>
  </React.StrictMode>
);
