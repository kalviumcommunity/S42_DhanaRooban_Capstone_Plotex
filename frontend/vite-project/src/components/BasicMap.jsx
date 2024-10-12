import React, { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import locationIcon from "../assets/Images/SignPage/locationIcon.png";

function BasicMap({ center }) {
  const MarkerIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [50, 50],
  });


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
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=7tzE4L8r2YzHm0h9XLja"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
         
          <Marker position={center} icon={MarkerIcon}></Marker>
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
