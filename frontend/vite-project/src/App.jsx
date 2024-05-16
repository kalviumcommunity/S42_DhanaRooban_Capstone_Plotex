import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Sign from "./components/Sign";
import Home from "./components/Home"; // Import the Home component
import OtpVerification from "./components/OTPPage";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/verify" element={<OtpVerification />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  ) ;
}

export default App;

