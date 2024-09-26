import React, { useEffect , useState, useContext,} from "react";
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
import AboutUs from "../Pages/AboutUs"
function Home() {
  const [userName, setUserName] = useState('');
  const { currentUser, loading } = useContext(UserContext);

  return (
    <>
    <Center h="100vh" overflowY="auto"
    p={4} >
      <VStack spacing={4}>
        <Text className="Bold" fontSize="2xl">
          Welcome { userName || 'Guest!'}
        </Text>
        <Button
        onClick={useNavigate}
          colorScheme="green"
          size="lg"
          className="Semibold"
        >
          ACCESS NAME HOME
        </Button>
      </VStack>
    </Center>
    <AboutUs/>
    </>
  );
}

export default Home;

