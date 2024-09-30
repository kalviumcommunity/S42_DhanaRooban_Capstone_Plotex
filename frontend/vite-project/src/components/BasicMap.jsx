import React, { useState, useEffect ,useContext } from "react";
import { Box, Container } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, useMap, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import locationIcon from "../assets/Images/SignPage/locationIcon.png";
import locactioniconsp from "../assets/Images/SignPage/locactioniconsp.png";
import UserContext from '../Atoms/UserContext';


function BasicMap({ center }) {
  const [address, setAddress] = useState("Loading...");




  const MarkerIconforpark = new L.Icon({
    iconUrl: locactioniconsp,
    iconSize: [30, 30],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46],
  });
  const MarkerIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [30, 30],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46],
  });
  const markers = [
    { lat: 11.1006, lon: 77.0267 },
    { lat: 11.1006, lon: 77.0247 },
    { lat: 11.0986, lon: 77.0267 },
    { lat: 11.0986, lon: 77.0247 },
    { lat: 11.1016, lon: 77.0257 },
];


  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // returns distance in meters
  };
console.log(center.lat, center.lon  )
  const filteredMarkers = markers.filter(marker => {
    const distance = getDistance(center.lat, center.lon, marker.lat, marker.lon);
    return distance <= 500; // 500 meters
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${center.lat}+${center.lon}&key=b9f770d4a67d4ada85473e2f8c3f4f9b`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch address');
        }

        const data = await response.json();
        setAddress(data.results[0]?.formatted || "Address not found");
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error fetching address");
      }
    };


    const fetchWithDelay = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      fetchAddress();
    };

    fetchWithDelay();
  }, [center]);

  return (
    <Container maxW="container.xl" p={4} display="flex" flexWrap="wrap">
      <Box
        h={{ base: "300px", md: "400px", lg: "500px" }}
        w="50%"
        ml="40%"
        mt="10%"
        position="absolute"
      >
        <MapContainer
          center={center}
          zoom={13}
          style={{
            borderRadius: "10px",
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle
            center={center}
            radius={300} // 500 meters
            pathOptions={{ color: 'yellow', fillColor: 'blue', fillOpacity: 0.2 }}
          />


          {filteredMarkers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lon]} icon={MarkerIconforpark}>
              <Popup>
                <b>Book to park</b>
              </Popup>
            </Marker>
          ))}



          <Marker position={center} icon={MarkerIcon}>
            <Popup>
              <b>🌐Located: {address}</b>
            </Popup>
          </Marker>
          <MapController center={center} />
        </MapContainer>
      </Box>
    </Container>
  );
}

function MapController({ center }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
}

export default BasicMap;
