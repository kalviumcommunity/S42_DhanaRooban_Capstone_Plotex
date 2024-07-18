import React, { useContext } from "react";
import { Box, Flex, Text, VStack, HStack, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import UserContext from "../Atoms/UserContext";

function Welcome({content}) {
  const { currentUser, loading } = useContext(UserContext);

  const titleFontSize = useBreakpointValue({ base: "lg", md: "xl" });
  const subtitleFontSize = useBreakpointValue({ base: "md", md: "lg" });
  const bodyFontSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <>
      <Navbar />
      <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4} width="full" maxWidth="container.md" padding={4}>
          <Text className="Bold" fontSize={titleFontSize}>{content.title}</Text>
          <Text className="Semibold" fontSize={subtitleFontSize}>{content.subtitle}</Text>
          <Text textAlign={{base:"left",md:"center"}}  className="regular" fontSize={bodyFontSize}>{content.bodyContent}</Text>
        </VStack>
      </Box>
    </>
  );
}

export default Welcome;