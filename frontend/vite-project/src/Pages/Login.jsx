import React, { useState } from "react";
import {
  Box,
  Center,
  Input,
  Button,
  Flex,
  Link,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import "../App.css";
import { NavLink } from "react-router-dom";
import Google from "../assets/Images/SignPage/Google.png";

import "react-phone-number-input/style.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../Config";
import StoreCookies from 'js-cookie';
import { ServicesFunctions } from "../Services/ServicesFunctions";

import { useNavigate } from "react-router-dom";


function LoginUpForm() {
  const { handleGoogleSignIn} = ServicesFunctions();
  const [isHovered, setIsHovered] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const navigate = useNavigate(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  

  const onSubmit = async (values) => {
    try {
      let modifiedData = {
        Username: values.Username,
        password: values.password,
      };

      const response = await axios.post(`${BASE_URL}/login`, modifiedData);
      const Token = response.data.token;
      StoreCookies.set('authToken', Token, { expires: 31 });
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate('/welcomep');
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "An error occurred",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };


 


  return (
    <>
      <Box
        bg="#fff"
        p="4"
        w="100vw"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
      >
        <Text fontSize="lg">Plotex</Text>
        <Text className="regular" color="black">
          Create your new plotex Account{" "}
          <Link as="span" color="#f54" className="Semibold">
            <NavLink to="/sign">SIGNIN</NavLink>
          </Link>
        </Text>
      </Box>
      <Center>
        <Toaster toastOptions={{ duration: 4000 }} />
        <Stack
          mt="100"
          className="regular"
           mb={4}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
          
            <label>Username</label>
            <Input
              mb={4}
              borderRadius="2"
              borderWidth="2"
              size="md"
              className="form-control"
              type="text"
              name="Username"
              placeholder="Username"
              {...register("Username", {
                required: "Username or Email is required",
              })}
            />
            {errors.Username && <Text color="red">{errors.Username.message}</Text>}

          
            <label>Password</label>
            <Input
               mb={4}
              borderRadius="2"
              borderWidth="2"
              size="md"
              type="password"
              name="password"
              className="form-control"
              placeholder="Password *"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be more than 4 characters",
                },
              })}
            />
            {errors.password && (
              <Text color="red">{errors.password.message}</Text>
            )}
            <Box display="flex" justifyContent="center">
              <Button
                w="100%"
                colorScheme="yellow"
                size="lg"
                className="Semibold"
                type="submit"
                // onClick={sendOTP}
                style={{ borderRadius: 0 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? "Sign Up For Free" : "Welcome"}
              </Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                  {showOTPInput && (
                    <>
                      <OtpInput
                        numInputs={4}
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </>
                  )}
                </ModalBody>
                <ModalFooter display="flex" justifyContent="center">
                  <Button type="submit" form="new-note" >
                    Submit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Text>or Login in using</Text>

            <Flex justifyContent="space-between" width="40%" mt="5">
              <Button onClick={handleGoogleSignIn} size="sm" w="45px" h="50px">
                <img src={Google} alt="" />
              </Button>
            </Flex>
          </form>
        </Stack>
      </Center>
      <div id="recaptcha-container"></div>
    </>
  );
}

export default LoginUpForm;
