import React from 'react'
import {
    Box,
    Center,
    FormControl,
    FormLabel,
    Input,
    Button,
    Checkbox,
    Flex,
    VStack,
    Link,
    Text,
  } from "@chakra-ui/react";
  import backgroundImage from '../assets/Images/SignPage/bg.svg'; 
function Home() {
  return (
    <Center h="50vh"  bgImage={`url(${backgroundImage})`}>
    <VStack spacing={4}>
      <Box boxSize="sm">
        <link></link>
      </Box>
      <Text className="Bold" fontSize="2xl">Welcome Dhana!</Text>
      <Button colorScheme="green" size="lg" className='Semibold'>
        ACCESS NAME HOME
      </Button>
    </VStack>
  </Center>
  )
}

export default Home