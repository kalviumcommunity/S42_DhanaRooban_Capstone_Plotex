import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Center,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import UserContext from "../Atoms/UserContext";
import { useNavigate } from "react-router-dom";
import { homePageContent } from "../Services/FrontendData";
import AboutUs from "../Pages/AboutUs";

function Home() {
  const [userName, setUserName] = useState('');
  const { currentUser, loading } = useContext(UserContext);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      const firstFourLetters = currentUser.email.substring(0, 5).toLowerCase();
      setUserName(firstFourLetters);
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAccessHome = () => {
    navigate('/find-space');
  };

  return (
    <>
      <Center h="100vh" overflowY="auto" p={4}>
        <VStack spacing={4}>
          <Text className="Bold" fontSize="2xl">
            Welcome {userName || 'Guest!'}
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
      <AboutUs />
    </>
  );
}

export default Home;
