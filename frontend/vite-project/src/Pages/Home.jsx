import React, { useContext } from "react";
import { Box, Button, Flex, Text, VStack, HStack, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar"

function Home() {
  const titleFontSize = useBreakpointValue({ base: "lg", md: "xl" });
  const subtitleFontSize = useBreakpointValue({ base: "md", md: "lg" });
  const bodyFontSize = useBreakpointValue({ base: "sm", md: "md" });


  return (
    <>
      <Navbar />
      <Box id="home" minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4} width="full" maxWidth="container.md" padding={4}>
          <Text className="Bold" fontSize={titleFontSize}>Park Smart, Connect Hearts</Text>
          <Text className="Semibold" fontSize={subtitleFontSize}>Discover Your Ideal Spot, Unlock Your Perfect Ride!</Text>
          <Text textAlign={{ base: "left", md: "center" }} className="regular" fontSize={bodyFontSize}>No stress Our platform effortlessly matches vehicles with parking spots and rentals in seconds, saving you valuable time.</Text>
        </VStack>
      </Box>
    </>
  );
}

export default Home;