import React, { useContext } from "react";
import { Box, Button, Flex, Text, VStack, HStack, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

function Welcome() {
  const titleFontSize = useBreakpointValue({ base: "lg", md: "xl" });
  const subtitleFontSize = useBreakpointValue({ base: "md", md: "lg" });
  const bodyFontSize = useBreakpointValue({ base: "sm", md: "md" });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/delete-account`, {
        userId: localStorage.getItem("userId"),
      });

      if (response.data.success) {
        toast.success("Account deleted successfully");
        localStorage.removeItem("userId");
        localStorage.removeItem("authToken");
        navigate("/sign");
      } else {
        toast.error(response.data.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting account");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <>
      <Navbar />
      <Box minHeight="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4} width="full" maxWidth="container.md" padding={4}>
          <Text className="Bold" fontSize={titleFontSize}>Park Smart, Connect Hearts</Text>
          <Text className="Semibold" fontSize={subtitleFontSize}>Discover Your Ideal Spot, Unlock Your Perfect Ride!</Text>
          <Text textAlign={{ base: "left", md: "center" }} className="regular" fontSize={bodyFontSize}>No stress Our platform effortlessly matches vehicles with parking spots and rentals in seconds, saving you valuable time.</Text>
        </VStack>
      </Box>
    </>
  );
}

export default Welcome;