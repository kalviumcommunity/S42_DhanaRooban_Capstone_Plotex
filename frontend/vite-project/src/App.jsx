import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import MainPage from "./Pages/mainpage";
import SignUpForm from "./Pages/Sign"
import LoginUpForm from "./Pages/Login";
import Welcome from "./Pages/Weclome"; // Corrected import name


function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginUpForm />} />
          <Route path="/sign" element={<SignUpForm />} />
          <Route path="/home" element={<Welcome />} />
        </Routes>
      </Router>
 
  );
}

export default App;