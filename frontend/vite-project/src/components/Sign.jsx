import React, { useState } from "react";
import {
  Box,
  Center,
  FormControl,
  Input,
  Button,
  Checkbox,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Google from "../assets/Images/SignPage/Google.png";
import Microsoft from "../assets/Images/SignPage/microsoft.png";
import Apple from "../assets/Images/SignPage/apple.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Services/firebaseAuth";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; 
import app from "../"
function SignUpForm() {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [number, setNumber] = useState("");
 

  const handleRegister = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        bg="#fff"
        p={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="lg">dhana</Text>
        <Text className="regular">
          Have a Dhana Account?{" "}
          <Link as="span" color="#f54" className="Semibold">
            <NavLink to="/login">Login</NavLink>
          </Link>
        </Text>
      </Box>
      <Center>
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
            mb={4}
          >
            Start with your free account today.
          </Text>

          <form>
            <FormControl mb={4}>
              <Input
                borderRadius="2px"
                borderWidth="2px"
                type="text"
                className="form-control"
                placeholder="Email *"
                size="md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <Input
                type="password"
                className="form-control"
                placeholder="Password *"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <PhoneInput
                className="form-control"
                defaultCountry="IN"
                size="lg"
                value={number}
                onChange={setNumber}
              />
            </FormControl>
            <Box id="recaptcha-containe"/>
            <Checkbox mb={4}>
              I agree to the <Link color="blue">Terms and Conditions</Link>
            </Checkbox>

            <Button
              colorScheme="red"
              size="lg"
              className="Semibold"
              type="button"
              // onClick={getOtp}
              borderRadius="0"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              mb={4}
            >
              {isHovered ? "Welcome" : "Sign Up for Free"}
            </Button>

            <Text>or Sign in using</Text>

            <Flex justifyContent="space-between" width="40%" mt="5">
              <Button size="sm" w="45px" h="50px"  onClick={handleRegister}>
                <img src={Google} alt="" />
              </Button>
              <Button size="sm" w="45px" h="50px">
                <img src={Microsoft} alt="" />
              </Button>
              <Button size="sm" w="50px" h="50px">
                <img src={Apple} alt="" />
              </Button>
            </Flex>
          </form>
        </Box>
      </Center>
    </>
  );
}

export default SignUpForm;
