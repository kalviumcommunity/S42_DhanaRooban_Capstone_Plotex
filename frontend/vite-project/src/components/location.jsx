import axios from 'axios';
import React, { useState } from 'react';

export const useGetIp = () => {
  const [ipDetails, setIpDetails] = useState(null);

  const fetchIpDetails = async () => {
    try {
      const ipResponse = await axios.get('https://api.ipify.org');
      const ipAddress = ipResponse.data;
      const detailsResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      setIpDetails(detailsResponse.data)
    } catch (error) {
      console.error(error.message);
    }
  };
  return { ipDetails,fetchIpDetails };
};
