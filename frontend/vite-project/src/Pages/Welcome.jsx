import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Center,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Welcomep() {
  const navigate = useNavigate()


  const handleAccessHome = () => {
    navigate('/');
  };

  return (
    <>
      <Center h="100vh" overflowY="auto" p={4}>
        <VStack spacing={4}>
          <Text className="Bold" fontSize="2xl">
            Welcome {'Guest!'}
          </Text>
          <Button
            onClick={handleAccessHome}
            colorScheme="green"
            size="lg"
            className="Semibold"
          >
            ACCESS NAME HOME
          </Button>
        </VStack>
      </Center>
    </>
  );
}

export default Welcomep ;
