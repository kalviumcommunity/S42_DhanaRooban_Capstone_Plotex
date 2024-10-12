import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDisclosure } from '@chakra-ui/react';
import toast from 'react-hot-toast';

export const useGetIp = () => {
  const [ipDetails, setIpDetails] = useState(null);
  const [address, setAddress] = useState('');
  const [center, setCenter] = useState({ lat: undefined, lon: undefined });
  const [locationFetched, setLocationFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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


  const Currentlocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lon: longitude });
          fetchAddress(latitude, longitude);
          setLocationFetched(true);
          setLoading(false);
          onClose();
          toast.success('Location fetched successfully!');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
          toast.error('Failed to fetch location. Please try again.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
      toast.error('Geolocation is not supported by your browser.');
    }
  };

 

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      setAddress(response.data.display_name);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  

 

  return {
    ipDetails,
    fetchIpDetails,
    fetchAddress,
    Currentlocation,
    center,
    address,
    locationFetched,
    loading,
    setLoading,
    isOpen,
    onOpen,
    onClose
  };
};
