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
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from 'react';
import apple from "../assets/Images/SignPage/apple.png";
import Google from "../assets/Images/SignPage/Google.png";
import microsoft from "../assets/Images/SignPage/microsoft.png";

function Login() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Center display="flex" flexDirection="column">
        <Box
          w="35vw"
          mt="100"
          className="regular"
          display="flex"
          flexDirection="column"
        >
          <Text
            className="Semibold"
            fontSize="2xl"
            textAlign="left"
            width="fit-content"
            mb={4} // Add margin bottom
          >
            Start with your free account today.
          </Text>
          <FormControl mb={4}>
            {" "}
            {/* Add margin bottom */}
            <FormLabel className="placeholder">Email *</FormLabel>
            <Input
              borderRadius="2px"
              borderWidth="2px"
              type="text"
              className="form-control"
              placeholder="Enter Email"
              size="md"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel className="placeholder">Password*</FormLabel>
            <Input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              size="lg"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel className="placeholder">Number*</FormLabel>
            <Input
              type="number"
              className="form-control"
              placeholder="Enter Number"
              size="lg"
            />
          </FormControl>
          <Checkbox mb={4}>
            I agree to the <Link color="blue">Terms and Conditions</Link>
          </Checkbox>
          <Button
            colorScheme="red"
            size="lg"
            className="Semibold"
            type="submit"
            borderRadius="0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            mb={4} // Add margin bottom
          >
            {isHovered ? "Welcome" : "Sign Up for Free"}
          </Button>
          <Text>or Sign in using</Text>
          <Flex justifyContent="space-between" width='40%' mt="5" >
            <Button size="sm" w="45px" h="50px">
              <img src={Google} alt="" />
            </Button>
            <Button size="sm" w="45px" h="50px">
              <img src={microsoft} alt="" />
            </Button>
            <Button size="sm" w="50px" h="50px">
              <img src={apple} alt="" />
            </Button>
          </Flex>
        </Box>
      </Center>
  )
}

export default Login