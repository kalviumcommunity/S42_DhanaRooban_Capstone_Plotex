import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import {
  Input,
  Button,
  Container,
  InputGroup,
  InputLeftElement,
  Image,
  AlertDialog,
  Box,
  Select,
  AlertDialogBody,
  FormControl,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Spinner,
  Text,
  FormLabel,
  VStack,
  Grid,
  Heading,
  Icon,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaCar, FaPhone, FaSearch } from "react-icons/fa";
import BasicMap from "../Services/BasicMap";
import locationIcon from "../assets/Images/SignPage/locationIcon.png";
import axios from "axios";
import { useGetIp } from "../Services/location";
import BASE_URL from "../Config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function FindSpace() {
  const {
    isOpen,
    onOpen,
    onClose,
    loading,
    setLoading,
    center,
    address,
    Currentlocation,
    fetchIpDetails,
    fetchNearbyLocations,
    accuracy,
    nearbyLocations,
  } = useGetIp();

  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    location: "",
    vehicleType: "",
    MobileNumber: "",
  });

  const token = Cookies.get("authToken");
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleConsent = async () => {
    try {
      await fetchIpDetails();
      await Currentlocation();
    } catch (error) {
      console.error("Error handling consent:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/profile/FindSpace/token`,
        { ...formValues, location: address, Currentlocation: center },
        {
          params: {
            token: token,
          },
        }
      );
      toast.success("Data submitted successfully!");
      await fetchNearbyLocations();
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleChange = (name) => (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const cancelRef = React.useRef();

  return (
    <>
      <Container maxW="container.xl" py={8} px={4} id="find-space">
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
          <Box
            bg={cardBg}
            p={6}
            borderRadius="xl"
            border="1px"
            borderColor={borderColor}
            shadow="md"
          >
            <Heading size="md" mb={6}>Find Available Parking</Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Button onClick={onOpen} variant="ghost" size="sm">
                        <Icon as={FaMapMarkerAlt} color="blue.500" />
                      </Button>
                    </InputLeftElement>
                    <Input
                      borderColor={borderColor}
                      placeholder="Enter your address"
                      value={address}
                      onChange={handleAddressChange}
                      _focus={{ borderColor: "blue.500" }}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Vehicle Type</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FaCar} color="blue.500" />
                    </InputLeftElement>
                    <Select
                      pl={10}
                      placeholder="Select vehicle type"
                      value={formValues.vehicleType}
                      onChange={(e) => handleChange("vehicleType")(e.target.value)}
                      borderColor={borderColor}
                    >
                      <option value="car">Car</option>
                      <option value="motorcycle">Motorcycle/Scooter</option>
                      <option value="truck">Truck/Van</option>
                      <option value="other">Others</option>
                    </Select>
                  </InputGroup>
                </FormControl>

                <FormControl isInvalid={error.phoneNumber}>
                  <FormLabel>Phone Number</FormLabel>
                  <Box borderRadius="md" borderColor={borderColor} border="1px" p={2}>
                    <PhoneInput
                      defaultCountry="IN"
                      value={formValues.MobileNumber}
                      onChange={(value) => handleChange("MobileNumber")(value)}
                    />
                  </Box>
                  {error.phoneNumber && (
                    <Text color="red.500" mt={2} fontSize="sm">
                      {error.phoneNumber.message}
                    </Text>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  w="full"
                  colorScheme="blue"
                  size="lg"
                  isLoading={loading}
                  leftIcon={<FaSearch />}
                >
                  Search Spaces
                </Button>
              </VStack>
            </form>
          </Box>
          <Box
            bg={cardBg}
            p={6}
            borderRadius="xl"
            border="1px"
            borderColor={borderColor}
            shadow="md"
          >
            <Heading size="md" mb={6}>Available Parking Spaces</Heading>
            {center ? (
              <Box mb={8} borderRadius="xl" overflow="hidden" border="1px" borderColor={borderColor}>
                {center.lat !== undefined && center.lon !== undefined && (
                  <BasicMap center={center} address={address} nearbyLocations={nearbyLocations} accuracy={accuracy} />
                )}
              </Box>
            ) : (
              <Text color="gray.500">No parking spaces found nearby. Try searching in a different location.</Text>
            )}
          </Box>
        </Grid>
      </Container>

      {/* Location Consent Dialog */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Consent to Collect Location</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            We would like to collect your location to enhance the service and provide a better user experience. This information will be used minimally and responsibly. Do you consent to this collection and use of your location?
            {loading && <Spinner size="sm" ml={3} />}
            {error && (
              <Text color="red.500" mt={2}>
                Error: {error}
              </Text>
            )}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} colorScheme="red" onClick={onClose}>
              No
            </Button>
            <Button colorScheme="blue" onClick={handleConsent} ml={3} isDisabled={loading}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default FindSpace;