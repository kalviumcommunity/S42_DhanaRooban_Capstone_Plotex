// import React from "react";
import React, { useState, useEffect  } from "react";
import { Box, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar";


function AboutUs() {

  const titleFontSize = useBreakpointValue({ base: "lg", md: "xl" });
  return (
    <>
    <Navbar />
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        minHeight="100vh"
        p={4}
      >
        <Box
          w={{ base: "90%", md: "80%" }}
          h={{base:"80vh",md:"50%"}}
          scrollBehavior={"auto"}
          bg="black"
          color="white"
          borderRadius="20px"
          overflowY="auto"
          p={6}
          textAlign="center"
          >
          <VStack spacing={4}>
            <Text fontSize={titleFontSize} fontWeight="bold">
            About Us
            </Text>
            <Text>Welcome to Plotex, where parking is made simple, convenient, and communal.Our journey began with a simple goal: to revolutionize the parking experience.We understand the hassle of finding parking in a bustling city or during busy events, as well as the challenge of listing unused parking spaces.That's why we created Plotex – to connect parking providers with users, making parking effortless for everyone.At Plotex, our mission is straightforward: to make parking easier, safer, and more rewarding for you. Whether you're renting out your parking space or searching for an affordable spot, we've got you covered. Our aim is to streamline your parking experience, allowing you to focus on what matters most to you."
            </Text>
          </VStack>
        </Box>
      </Box>
  </>
  );
}

export default AboutUs;
