import { useState, useEffect ,useCallback} from 'react';
import axios from 'axios';
import { useDisclosure } from '@chakra-ui/react';
import { toast } from 'react-hot-toast';

import BASE_URL from '../Config';

export const useGetIp = () => {
  const [ipDetails, setIpDetails] = useState(null);
  const [address, setAddress] = useState('');
  const [center, setCenter] = useState({ lat: undefined, lon: undefined });
  const [locationFetched, setLocationFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const { isOpen, onOpen, onClose   } = useDisclosure();

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


  const fetchNearbyLocations = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/nearby`, {
        lat: center.lat,
        lon: center.lon,
      });
     
      if (response.status === 200 && response.data.nearbyLocations.length > 0) {
        setNearbyLocations(response.data.nearbyLocations);
        toast.success(`Found ${response.data.nearbyLocations.length} nearby locations.`);
      } else {
        setNearbyLocations([]);
        toast.error('No nearby locations found.');
      }
    } catch (error) {
      console.error('Error fetching nearby locations:', error);
      toast.error('Failed to fetch nearby locations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Updated nearbyLocations:', nearbyLocations);
  }, [nearbyLocations]);



  return {
    ipDetails,
    fetchNearbyLocations,
    fetchIpDetails,
    fetchAddress,
    Currentlocation,
    center,
    address,
    nearbyLocations,
    locationFetched,
    loading,
    setLoading,
    isOpen,
    onOpen,
    onClose
  };
};