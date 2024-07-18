// components/CurrentUserProvider.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import BASE_URL from '../Config';
import UserContext from '../Atoms/UserContext';

function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('authToken');
  

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/profile/token`, {
          params: {
            token: token,
          },
        });
        console.log(response.data)
        setCurrentUser(response.data.FilterData);
      } catch (error) {
        console.log(error.message);
        if (error.response && error.response.status === 403) {
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
      fetchCurrentUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ currentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export default CurrentUserProvider;
