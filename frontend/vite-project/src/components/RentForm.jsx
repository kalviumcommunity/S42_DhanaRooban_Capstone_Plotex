import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Container,
  Step,
  StepIndicator,
  StepTitle,
  StepDescription,
  StepStatus,
  StepNumber,
  StepSeparator,

  
  Stepper,
  Text,
  InputGroup,
  InputLeftElement,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import PhoneInput from "react-phone-number-input";
import { useForm } from "react-hook-form";
import locationIcon from "../assets/Images/SignPage/locationIcon.png";
import { useGetIp } from "../components/location";
import toast from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../Config";
import Cookies from "js-cookie";

function RentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("authToken");
  const [ipData, setIpData] = useState("");
  const { ipDetails, fetchIpDetails } = useGetIp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Personal Info", description: "Enter your personal details" },
    { title: "Parking Details", description: "Enter parking details" },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleConsent = async () => {
    await fetchIpDetails();
    await setIpData(ipDetails);
    onClose();
  };

  const onSubmit = async (value) => {
    setIsLoading(true);

    const modifiedData = {
      Name: value.name.toUpperCase().replace(/\s+/g, "").replace(/[^\w]/g, ""),
      Email: value.email.toUpperCase(),
      PhoneNumber: value.phoneNumber.replace(/\D/g, ""),
      Location: value.location.toUpperCase(),
      VehicleType: value.vehicleType
        .toUpperCase()
        .replace(/\s+/g, "")
        .replace(/[^\w]/g, ""),
      ParkingSpace: value.parkingSpaceType
        .toUpperCase()
        .replace(/\s+/g, "")
        .replace(/[^\w]/g, ""),
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/profile/post/token`,
        { modifiedData, ipData },
        { params: { token } }
      );
      toast.success("Data submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit data.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const bgColor = useColorModeValue("white", "black");
  const textColor = useColorModeValue("black", "white");

  return (
    <Container  bg={bgColor} color={textColor} maxW="100vw" py={8}>
      <Box   display={{ base: "none", md: "Block" }} bg={bgColor} borderRadius="md" boxShadow="md" p={6}>
        <Stepper size="sm" index={activeStep} mb={6}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepNumber />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              {index < steps.length - 1 && <StepSeparator />}
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter your name"
                  name="name"
                  {...register("name", {
                    required: "Name is required",
                    validate: (value) =>
                      value.split("").length > 2 ||
                      "Name must be more than two words",
                  })}
                />
                {errors.name && (
                  <Text color="red.500">{errors.name.message}</Text>
                )}
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@gmail\.com$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <Text color="red.500">{errors.email.message}</Text>
                )}
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Phone Number</FormLabel>
                <PhoneInput
                  name="phoneNumber"
                  defaultCountry="IN"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phoneNumber && (
                  <Text color="red.500">{errors.phoneNumber.message}</Text>
                )}
              </FormControl>

              <Button
                mt="2%"
                w="100%"
                borderRadius="0"
                colorScheme="blue"
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>
            </>
          )}

          {activeStep === 1 && (
            <>
              <FormControl mb={4}>
                <FormLabel>Address</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Button onClick={onOpen} variant="ghost" size="sm">
                      <Image src={locationIcon} alt="Location Icon" />
                    </Button>
                    <AlertDialog
                      motionPreset="slideInBottom"
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                      isOpen={isOpen}
                      isCentered
                    >
                      <AlertDialogOverlay />
                      <AlertDialogContent m="10">
                        <AlertDialogHeader>
                          Consent to Collect IP Address
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                          We would like to collect your IP address to enhance
                          the service and provide a better user experience. This
                          information will be used minimally and responsibly. Do
                          you consent to this collection and use of your IP
                          address?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                          <Button
                            ref={cancelRef}
                            colorScheme="red"
                            onClick={onClose}
                          >
                            No
                          </Button>
                          <Button
                            colorScheme="blue"
                            onClick={handleConsent}
                            ml={3}
                          >
                            Yes
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </InputLeftElement>
                  <Input
                    placeholder="Enter your address"
                    name="location"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                </InputGroup>
                {errors.location && (
                  <Text color="red.500">{errors.location.message}</Text>
                )}
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Vehicle Type</FormLabel>
                <Select
                  placeholder="Select vehicle type"
                  name="vehicleType"
                  {...register("vehicleType", {
                    required: "Vehicle type is required",
                  })}
                >
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle/Scooter</option>
                  <option value="truck">Truck/Van</option>
                  <option value="other">Others</option>
                </Select>
                {errors.vehicleType && (
                  <Text color="red.500">{errors.vehicleType.message}</Text>
                )}
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Parking Space Type</FormLabel>
                <Select
                  placeholder="Select parking space type"
                  name="parkingSpaceType"
                  {...register("parkingSpaceType", {
                    required: "Parking space type is required",
                  })}
                >
                  <option value="indoor">Indoor Parking</option>
                  <option value="outdoor">Outdoor Parking</option>
                  <option value="garage">Garage Parking</option>
                  <option value="carport">Carport Parking</option>
                  <option value="motorcycle">Motorcycle Parking</option>
                </Select>
                {errors.parkingSpaceType && (
                  <Text color="red.500">{errors.parkingSpaceType.message}</Text>
                )}
              </FormControl>

              <Box display="flex" justifyContent="space-between">
                <Button
                  mt="2%"
                  w="45%"
                  borderRadius="0"
                  colorScheme="blue"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button
                  isLoading={isLoading}
                  loadingText="Submitting"
                  mt="2%"
                  w="45%"
                  borderRadius="0"
                  colorScheme="blue"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </>
          )}
        </form>
      </Box>
      <Box display={{ base: "block", md: "none" }} >
      <form >
        <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter your name"
            name="name"
            {...register("name", {
              required: "Name is required",
              validate: (value) =>
                value.split("").length > 2 ||
                "Name must be more than two words",
            })}
          />
          {errors.name && <Text color="red.500">{errors.name.message}</Text>}
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@gmail\.com$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <Text color="red.500">{errors.email.message}</Text>}

          <PhoneInput
            name="phoneNumber"
            defaultCountry="IN"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
          />
          {errors.phoneNumber && (
            <Text color="red.500">{errors.phoneNumber.message}</Text>
          )}
          <FormLabel>Vehicle Type</FormLabel>
          <Select
            placeholder="Select vehicle type"
            name="vehicleType"
            {...register("vehicleType", {
              required: "Vehicle type is required",
            })}
          >
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle/Scooter</option>
            <option value="truck">Truck/Van</option>
            <option value="other">Others</option>
          </Select>
          {errors.vehicleType && (
            <Text color="red.500">{errors.vehicleType.message}</Text>
          )}

          <FormLabel>Parking Space Type</FormLabel>
          <Select
            placeholder="Select parking space type"
            name="parkingSpaceType"
            {...register("parkingSpaceType", {
              required: "Parking space type is required",
            })}
          >
            <option value="indoor">Indoor Parking</option>
            <option value="outdoor">Outdoor Parking</option>
            <option value="garage">Garage Parking</option>
            <option value="carport">Carport Parking</option>
            <option value="motorcycle">Motorcycle Parking</option>
          </Select>
          {errors.parkingSpaceType && (
            <Text color="red.500">{errors.parkingSpaceType.message}</Text>
          )}
           <FormControl mb={4}>
                <FormLabel>Address</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Button onClick={onOpen} variant="ghost" size="sm">
                      <Image src={locationIcon} alt="Location Icon" />
                    </Button>
                    <AlertDialog
                      motionPreset="slideInBottom"
                      leastDestructiveRef={cancelRef}
                      onClose={onClose}
                      isOpen={isOpen}
                      isCentered
                    >
                      <AlertDialogOverlay />
                      <AlertDialogContent m="10">
                        <AlertDialogHeader>
                          Consent to Collect IP Address
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                          We would like to collect your IP address to enhance
                          the service and provide a better user experience. This
                          information will be used minimally and responsibly. Do
                          you consent to this collection and use of your IP
                          address?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                          <Button
                            ref={cancelRef}
                            colorScheme="red"
                            onClick={onClose}
                          >
                            No
                          </Button>
                          <Button
                            colorScheme="blue"
                            onClick={handleConsent}
                            ml={3}
                          >
                            Yes
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </InputLeftElement>
                  <Input
                    placeholder="Enter your address"
                    name="location"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                </InputGroup>
                {errors.location && (
                  <Text color="red.500">{errors.location.message}</Text>
                )}
              </FormControl>
              <Button
                  isLoading={isLoading}
                  loadingText="Submitting"
                  mt="2%"
                  w="45%"
                  borderRadius="0"
                  colorScheme="blue"
                  type="submit"
                >
                  Submit
                </Button>
        </form>
      </Box>
    </Container>
  );
}

export default RentForm;
