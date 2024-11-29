import React from 'react'
import AboutUs from './AboutUs'

import Home from "./Home"
import RentYourSpace from "./RentYourSpace"
import FindSpace from './FindSpace'
import Login from "./Login"
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate(); 

  React.useEffect(() => {
 
    const token = document.cookie.split(';').find(row => row.trim().startsWith('authToken'));
    if (token) {
      setIsAuthenticated(true);
      navigate('/');
    }
  }, []);


  return (
    <div>  
      {isAuthenticated ? (
        <>
          <Home/>
          <AboutUs/>
          <FindSpace/>
          <RentYourSpace/>
        </>
      ) : (
        <>
        <Login  />
        </>
      )}
    </div>
  )
}

export default MainPage;