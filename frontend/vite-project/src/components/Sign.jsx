import React, { useState } from "react";
import {
  Box,
  Center,
  Input,
  Button,
  Checkbox,
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
import Microsoft from "../assets/Images/SignPage/microsoft.png";
import Apple from "../assets/Images/SignPage/apple.png";

import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../Services/firebaseAuth";

import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../Config";
import StoreCookies from "js-cookie";

import { useNavigate } from "react-router-dom";
function SignUpForm() {
  const [isHovered, setIsHovered] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate(); 


  const onSubmit = async (value) => {
    try {
      const modifiedData = {
        Email: value.email.toUpperCase(),
        PhoneNumber: value.phoneNumber.replace(/\D/g, ""),
        Password: value.password.trim(),
      };

      const response = await axios.post(
        `${BASE_URL}/singin`,
        modifiedData,
      );

      const Token = response.data.token;
      StoreCookies.set("authToken", Token, { expires: 7 });
      navigate('/find-space');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  

  const renderInput = (inputProps) => (
    <input
      {...inputProps}
      style={{ width: "40px", height: "40px", margin: "8px" }}
    />
  );

  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            sendOTP();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const sendOTP = () => {
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    console.log(phoneNumber)
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast({
          title: "OTP sent successfully!",
          status: "success",
          duration: 4000, 
          isClosable: true,
        });
        setShowOTPInput(true);
        onOpen();
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        toast({
          title: "Error sending OTP",
          description: error.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  const verifyOTP = () => {
    if (!window.confirmationResult) {
      toast({
        title: "Error",
        description: "No OTP received. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        if (result.user) {
          toast({
            title: "OTP verified successfully!",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          onClose();
        } else {
          toast({
            title: "Error",
            description: "OTP verification failed.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Invalid verification code.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };


  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const profile = result.user;

      
      const GoogleUserData = {
        id: profile.uid,
        fullName: profile.displayName,
        givenName: profile.displayName.split(' ')[0],
        familyName: profile.displayName.split(' ')[1],
        imageUrl: profile.photoURL,
        email: profile.email,
      };
    
      const response = await axios.post(
        `${BASE_URL}/gsignin`,
        { GoogleUserData },
      );
      console.log('Response from server:', response);

      navigate('/home');
    } catch (error) {
      console.error("Error signing in with Google:", error);
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
        <Text fontSize="lg">pLoTeX</Text>
        <Text className="regular" color="black">
          Have a Dhana Account?{" "}
          <Link as="span" color="#f54" className="Semibold">
            <NavLink to="/login">Login</NavLink>
          </Link>
        </Text>
      </Box>
      <Center>
        <Toaster toastOptions={{ duration: 4000 }} />
        <Stack mt="100" className="regular" mb={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <Input
              mb={4}
              borderRadius="2"
              borderWidth="2"
              size="md"
              className="form-control"
              type="text"
              name="email"
              placeholder="Email*"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && <Text color="red">{errors.email.message}</Text>}

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

            <label>Phone Number</label>
            <PhoneInput
              mb={4}
              className="form-control"
              name="phoneNumber"
              defaultCountry="IN"
              style={{ width: "100%" }}
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
            {errors.phoneNumber && (
              <Text color="red">{errors.phoneNumber.message}</Text>
            )}
            <Checkbox mt={4} mb={4}>
              I agree to the <Link color="blue">Terms and Conditions</Link>
            </Checkbox>

            <Box display="flex" justifyContent="center">
              <Button
                w="100%"
                colorScheme="yellow"
                size="lg"
                className="Semibold"
                type="submit"
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
                    <OtpInput
                      numInputs={4}
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={setOtp}
                      renderInput={renderInput}
                    />
                  )}
                </ModalBody>
                <ModalFooter display="flex" justifyContent="center">
                  <Button type="submit" onClick={verifyOTP}>
                    Submit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Text>or Sign in using</Text>

            <Flex justifyContent="space-between" width="40%" mt="5">
              <Button onClick={handleGoogleSignIn} size="sm" w="45px" h="50px">
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
        </Stack>
      </Center>
      <div id="recaptcha-container"></div>
    </>
  );
}

export default SignUpForm;
