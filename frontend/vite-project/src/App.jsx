import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import './index.css';

import MainPage from "./Pages/Mainpage.jsx";
function App() {
  return (
    <>
<MainPage/>
    </>


);
}

export default App;
// <Router>
//   <Routes>
//     {/* <Route path="/sign" element={<Sign />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/home" element={<Home />} />
//     <Route path="/welcome" element={<Welcome />} />
//     <Route path="/about" element={<AboutUs />} />
//     <Route path="/find-space" element={<FindSpace />} />
//     <Route path="/rent-space" element={<RentSpace />} />
//     <Route path="/map/" element={<BasicMap />} />
//     <Route path="/" element={<Navigate to="/login" />} />
//     <Route path="/RentForm" element={<RentForm />} /> */}
//   </Routes>
// </Router>