// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import MainPage from './Pages/Mainpage';
import SignUpForm from "./Pages/Sign";
import LoginUpForm from "./Pages/Login";
import Welcomep from "./Pages/Welcome";
import { CurrentUserProvider } from "./Atoms/CurrentUser";

function App() {
  return (
    <CurrentUserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginUpForm />} />
          <Route path="/sign" element={<SignUpForm />} />
          <Route path="/Welcomep" element={<Welcomep />} />
        </Routes>
      </Router>
    </CurrentUserProvider>
  );
}

export default App;