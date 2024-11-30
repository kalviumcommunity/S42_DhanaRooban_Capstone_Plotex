import React, { useState } from "react";
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
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm } from "react-hook-form";
import locationIcon from "../assets/Images/SignPage/locationIcon.png";
import { useGetIp } from "../Services/location";
import toast from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../Config";
import Cookies from "js-cookie";

function RentForm({ setShowRentForm }) {
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("authToken");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Define color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const {
    ipDetails,
    center,
    Currentlocation,
    fetchIpDetails,
    address,
    isOpen,
    onOpen,
    onClose
  } = useGetIp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { title: "Personal Info", description: "Enter your personal details" },
    { title: "Parking Details", description: "Enter parking details" },
  ];

  const cancelRef = React.useRef();

  // Mobile stepper component
  const MobileStepper = ({ activeStep, steps }) => (
    <Stack spacing={4} width="100%" mb={6}>
      <Box 
        p={4} 
        borderRadius="md" 
        bg={useColorModeValue('blue.50', 'blue.900')}
        border="1px solid"
        borderColor={useColorModeValue('blue.200', 'blue.700')}
      >
        <Text fontWeight="bold" fontSize="lg">
          Step {activeStep + 1} of {steps.length}
        </Text>
        <Text fontSize="md" mt={1}>
          {steps[activeStep].title}
        </Text>
        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')} mt={1}>
          {steps[activeStep].description}
        </Text>
      </Box>
      <Box 
        width="100%" 
        height="2px" 
        bg={useColorModeValue('gray.200', 'gray.700')}
      >
        <Box 
          width={`${((activeStep + 1) / steps.length) * 100}%`} 
          height="100%" 
          bg="blue.500" 
          transition="width 0.3s ease-in-out"
        />
      </Box>
    </Stack>
  );

  const handleConsent = async () => {
    try {
      await fetchIpDetails();
      Currentlocation();
    } catch (error) {
      console.error('Error handling consent:', error);
    }
  };

  const onSubmit = async (value) => {
    setIsLoading(true);
    const modifiedData = {
      Name: value.name.toUpperCase().replace(/\s+/g, "").replace(/[^\w]/g, ""),
      Email: value.email.toUpperCase(),
      PhoneNumber: phoneNumber.replace(/\D/g, ""),
      Location: address,
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
        `${BASE_URL}/profile/RentalUserPost/token`,
        { modifiedData, ipDetails, center },
        { params: { token } }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Data submitted successfully!");
        reset();
        setActiveStep(0);
        setIsLoading(false);
        setShowRentForm(false);
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Failed to submit data.");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid && activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Container bg={bgColor} color={textColor} maxW="100vw" py={8}>
      <Box
        bg={bgColor}
        borderRadius="md"
        boxShadow="md"
        p={6}
        width="100%"
        border="1px solid"
        borderColor={borderColor}
      >
        {/* Desktop Stepper */}
        <Box display={{ base: "none", md: "block" }}>
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
        </Box>

        {/* Mobile Stepper */}
        <Box display={{ base: "block", md: "none" }}>
          <MobileStepper activeStep={activeStep} steps={steps} />
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <Stack spacing={4}>
              <FormControl isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter your name"
                  name="name"
                  {...register("name", {
                    required: "Name is required",
                    validate: (value) =>
                      value.length > 2 || "Name must be more than two words",
                  })}
                />
                {errors.name && (
                  <Text color="red.500">{errors.name.message}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <Text color="red.500">{errors.email.message}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={errors.phoneNumber}>
                <FormLabel>Phone Number</FormLabel>
                <Box borderRadius="md" overflow="hidden">
                  <PhoneInput
                    defaultCountry="IN"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid',
                      borderColor: errors.phoneNumber ? 'red' : borderColor
                    }}
                  />
                </Box>
                {errors.phoneNumber && (
                  <Text color="red.500">{errors.phoneNumber.message}</Text>
                )}
              </FormControl>

              <Button
                w="100%"
                colorScheme="blue"
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>
            </Stack>
          )}

          {activeStep === 1 && (
            <Stack spacing={4}>
              <FormControl isInvalid={errors.Location}>
                <FormLabel>Location</FormLabel>
                <Button 
                  onClick={onOpen} 
                  variant="outline" 
                  size="md" 
                  w="100%"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Image
                    src={locationIcon}
                    alt="Location Icon"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Fetch Location
                </Button>
                <Text mt={2} fontSize="sm">
                  {address ? `Location: ${address}` : "Location not fetched yet"}
                </Text>
                <Input
                  type="hidden"
                  value={address}
                  {...register("Location", {
                    validate: () => address !== "" || "Location is required",
                  })}
                />
                {errors.Location && (
                  <Text color="red.500">{errors.Location.message}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={errors.vehicleType}>
                <FormLabel>Vehicle Type</FormLabel>
                <Select
                  placeholder="Select vehicle type"
                  name="vehicleType"
                  {...register("vehicleType", {
                    required: "Vehicle type is required",
                  })}
                >
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="truck">Truck</option>
                </Select>
                {errors.vehicleType && (
                  <Text color="red.500">{errors.vehicleType.message}</Text>
                )}
              </FormControl>

              <FormControl isInvalid={errors.parkingSpaceType}>
                <FormLabel>Parking Space Type</FormLabel>
                <Select
                  placeholder="Select parking space type"
                  name="parkingSpaceType"
                  {...register("parkingSpaceType", {
                    required: "Parking space type is required",
                  })}
                >
                  <option value="open">Open</option>
                  <option value="covered">Covered</option>
                </Select>
                {errors.parkingSpaceType && (
                  <Text color="red.500">{errors.parkingSpaceType.message}</Text>
                )}
              </FormControl>

              <Stack spacing={3}>
                <Button
                  w="100%"
                  colorScheme="blue"
                  isLoading={isLoading}
                  type="submit"
                >
                  Submit
                </Button>
                <Button 
                  w="100%" 
                  variant="outline" 
                  onClick={prevStep}
                >
                  Previous
                </Button>
              </Stack>
            </Stack>
          )}
        </form>
      </Box>

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
            We would like to collect your IP address to enhance the
            service and provide a better user experience. This
            information will be used minimally and responsibly. Do you
            consent to this collection and use of your IP address?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} colorScheme="red" onClick={onClose}>
              No
            </Button>
            <Button colorScheme="blue" onClick={handleConsent} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  );
}

export default RentForm;