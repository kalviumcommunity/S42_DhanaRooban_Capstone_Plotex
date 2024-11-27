import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
// App.jsx
import MainPage from './Pages/Mainpage';

import SignUpForm from "./Pages/Sign"
import LoginUpForm from "./Pages/Login";
import Welcomep from "./Pages/Welcome"; // Corrected import name


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginUpForm />} />
          <Route path="/sign" element={<SignUpForm />} />
          <Route path="/home" element={<Welcomep/>} />
        </Routes>
      </Router>
 
  );
}

export default App;