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
import AboutUs from "./AboutUs";

function Welcomep() {
  const [userName, setUserName] = useState('');
  // const navigate = useNavigate()


  // const handleAccessHome = () => {
  //   navigate('/welcome');
  // };

  return (
    <>
      <Center h="100vh" overflowY="auto" p={4}>
        <VStack spacing={4}>
          <Text className="Bold" fontSize="2xl">
            Welcome {'Guest!'}
          </Text>
          <Button
            // onClick={handleAccessHome}
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

export default Welcomep ;
