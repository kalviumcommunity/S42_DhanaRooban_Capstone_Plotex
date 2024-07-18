import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box,useBreakpointValue } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { DarkModeIcon, LightModeIcon } from "../assets/Images/GobalImages/LightDark";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bodyFontSize = useBreakpointValue({ base: "sm", md: "md" });
  return (
    <Container
      p={{ base: "2", md: "4" }}
      display="flex"
      justifyContent={{ base: "space-between", md: "end" }} 
      gap={{ base: "2", md: "5" }}
      maxW="100vw"
      className="Semibold"
      style={{ border: "2px solid black" }}
    >
      <Box display={{ base: "none", md: "block" }}> 
        <Button
          position="absolute"
          cursor="pointer"
          alt="logo"
          justifyContent="center"
          onClick={toggleColorMode}
          borderRadius="5%"
          mt="3%"
          ml="40%"
        >
          {colorMode === 'dark'? <LightModeIcon /> : <DarkModeIcon />}
        </Button>
      </Box>

      <Box   fontSize={bodyFontSize} display={{ base: "flex", md: "flex" }} gap={{base:"5",md:"100"}} > 
        <Link to="/welcome"  mb={{ base: "2", md: "0" }}>Home</Link> 
        <Link to="/about" mb={{ base: "2", md: "0" }}>About Us</Link>
        <Link to="/find-space" mb={{ base: "2", md: "0" }}>Find Your Space</Link>
        <Link to="/rent-space" mb={{ base: "2", md: "0" }}>Rent Your Space</Link>
      </Box>
    </Container>
  );
}

export default Navbar;