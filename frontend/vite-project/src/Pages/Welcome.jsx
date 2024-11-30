// src/Pages/Welcome.jsx
import React, { useContext } from "react";
import {
  Box,
  Center,
  Button,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Atoms/UserContext";  // Make sure this path is correct

function Welcomep() {
  const navigate = useNavigate();
  const { currentUser, loading } = useContext(UserContext);

  const handleAccessHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center h="100vh" overflowY="auto" p={4}>
      <VStack spacing={4}>
        <Text className="Bold" fontSize="2xl">
          Welcome {currentUser?.name || 'Guest'}
        </Text>
        <Button
          onClick={handleAccessHome}
          colorScheme="green"
          size="lg"
          className="Semibold"
        >
          ACCESS HOME
        </Button>
      </VStack>
    </Center>
  );
}

export default Welcomep;