import React from "react";
import { Box, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

function AboutUs({ content }) {
 
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
              {content.title}
            </Text>
            <Text>{content.body}</Text>
          </VStack>
        </Box>
      </Box>
  </>
  );
}

export default AboutUs;
