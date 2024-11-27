// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import MainPage from "./Pages/mainpage";
import SignUpForm from "./Pages/Sign"
import LoginUpForm from "./Pages/Login";
import Weclome from "./Pages/Weclome";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginUpForm />} />
        <Route path="/sign" element={<SignUpForm />} />
        <Route path="/home" element={<Weclome />} />
      </Routes>
    </Router>
  );
}

export default App;