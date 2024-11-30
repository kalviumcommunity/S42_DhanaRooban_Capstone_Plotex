import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import locationIcon from "../assets/Images/SignPage/locationIcon.png";
import Logo from "../assets/Images/Logo.png"
import { useGetIp } from "./location";


//Fix for the default icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: import('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: import('leaflet/dist/images/marker-icon.png'),
  shadowUrl: import('leaflet/dist/images/marker-shadow.png'),
});

function BasicMap({ center, address, nearbyLocations }) {
  
  const MarkerIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [50, 50],
  });

  const parkingIcon = new L.Icon({
    iconUrl: Logo,  
    iconSize: [32, 32],
  });

 
  const defaultCenter = { lat: 0, lon: 0 };
  const mapCenter = (center && center.lat && center.lon) 
    ? [center.lat, center.lon] 
    : [defaultCenter.lat, defaultCenter.lon];


  
    
  useEffect(() => {
    nearbyLocations.forEach((location, index) => {
      if (location.location && location.location.coordinates) {
        const [lon, lat] = location.location.coordinates;
        console.log(`Location ${index}: Latitude: ${lat}, Longitude: ${lon}`);
      }
    });
  }, [nearbyLocations]);

  return (
    <Box
      h={{ base: "300px", md: "400px", lg: "500px" }}
      w="100%"
      position="relative"
    >
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <Marker position={mapCenter} icon={MarkerIcon}>
          <Popup>
            {address ? address : "Your location"}
          </Popup>
        </Marker>
        {nearbyLocations.map((location, index) => {
          if (location.location && location.location.coordinates) {
            const [lon, lat] = location.location.coordinates;
            return (
              <Marker 
                key={index} 
                position={[lat, lon]} 
                icon={parkingIcon}
              >
                <Popup>
                <div>
                    <p><b>Name:</b> 📝 {location.RentalUserDetails.name}</p>
                    <p><b>Email:</b> 📧 {location.email}</p>
                    <p><b>Parking Space:</b> 🛅 {location.RentalUserDetails.parkingSpace}</p>
                    <p><b>Phone Number:</b> 📞 {location.RentalUserDetails.phoneNumber}</p>
                    <p><b>Vehicle Type:</b> {getVehicleEmoji(location.RentalUserDetails.vehicleType)}</p>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </Box>
  );
}


function getVehicleEmoji(type) {
  switch(type.toLowerCase()) {
    case 'car':
      return '🚗';
    case 'truck':
      return '🛻';
    case 'bike':
      return '🛵';
    default:
      return '🚗';
  }
}

export default BasicMap;