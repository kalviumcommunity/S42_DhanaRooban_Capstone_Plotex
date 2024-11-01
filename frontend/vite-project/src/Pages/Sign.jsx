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
  useDisclosure,
} from "@chakra-ui/react";
import { ServicesFunctions } from "../Services/ServicesFunctions";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import "../App.css";
import { NavLink } from "react-router-dom";
import Google from "../assets/Images/SignPage/Google.png";





import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../Config";
import StoreCookies from "js-cookie";

import { useNavigate } from "react-router-dom";
function SignUpForm() {
  const [isHovered, setIsHovered] = useState(false);
  const { handleGoogleSignIn} = ServicesFunctions();

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
        Username: value.Username.toLowerCase(),
        PhoneNumber: value.phoneNumber.replace(/\D/g, ""),
        Password: value.password.trim(),
      };
      const response = await axios.post(
        `${BASE_URL}/singin`,
        modifiedData,
      );
      const Token = response.data.token;
      StoreCookies.set("authToken", Token, { expires: 7 });
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate('/find-space');
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
                required: "Username is required",
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

          
            <Text>or Sign in using</Text>

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

export default SignUpForm;
