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
import "../App.css";
import { NavLink } from "react-router-dom";
import Google from "../assets/Images/SignPage/Google.png";
import Microsoft from "../assets/Images/SignPage/microsoft.png";
import Apple from "../assets/Images/SignPage/apple.png";

import { signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../Services/firebaseAuth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios"
import BASE_URL from "../Config";


import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";


function SignUpForm() {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [phoneNumber, setphoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();


  axios.get(`${BASE_URL}/data`)
  .then(response=>{
    console.log(response)
  })
  .catch(error =>{
    console.log(error)
  })
 

  const renderInput = (inputProps) => (
    <input
      {...inputProps}
      style={{ width: "40px", height: "40px", margin: "8px" }}
    />
  );



  const handleRegister = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  function onCaptchaVerify() {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              sendOTP();
            },
            "expired-callback": () => {},
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function sendOTP() {
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent successfully!");
        setShowOTPInput(true);
        onOpen();
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        toast.error("Error sending OTP: " + error.message);
      });
  }

  function verifyOTP(event) {
    event.preventDefault();
    if (!window.confirmationResult) {
      toast.error("No OTP received. Please try again.");
      return;
    }
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        if (result.user) {
          toast.success("OTP verified successfully!");
          onClose();
        } else {
          toast.error("OTP verification failed.");
        }
      })
      .catch((error) => {
        toast.error("Invalid-verification-code");
      });
  }

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <Box
        bg="#fff"
        p="4"
        m="1"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="lg">pLoTeX</Text>
        <Text className="regular">
          Have a Dhana Account?{" "}
          <Link as="span" color="#f54" className="Semibold">
            <NavLink to="/login">Login</NavLink>
          </Link>
        </Text>
      </Box>
      <Center>
        <Box
          padding="5vw"
          className="regular"
          display="flex"
          flexDirection="column"
          width={{ base: "90%", md: "45%" }}
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
              <label>Email</label>
              <Input
                type="text"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: 0 }} 
              />
            </FormControl>

            <FormControl mb={4}>
              <label>Password</label>
              <Input
                type="password"
                className="form-control"
                placeholder="Password *"
                size="lg"
                style={{ borderRadius: 0 }} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <label>Phone Number</label>
              <PhoneInput
                className="form-control"
                style={{ borderRadius: 0 }} 
                defaultCountry="IN"
                value={phoneNumber}
                onChange={setphoneNumber}
              />
            </FormControl>
            <Checkbox mb={4}>
              I agree to the <Link color="blue">Terms and Conditions</Link>
            </Checkbox>
            <div id="recaptcha-container"></div>
            <Box display="flex" justifyContent="center">
              <Button
                w="100%"
                colorScheme="yellow"
                size="lg"
                className="Semibold"
                type="button"
                onClick={sendOTP}
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
                  <Button type="submit" form="new-note" onClick={verifyOTP}>
                    Submit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Text>or Sign in using</Text>

            <Flex justifyContent="space-between" width="40%" mt="5">
              <Button size="sm" w="45px" h="50px" onClick={handleRegister}>
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

export default SignUpForm