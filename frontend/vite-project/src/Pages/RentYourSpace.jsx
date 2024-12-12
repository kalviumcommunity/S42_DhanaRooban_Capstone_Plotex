import { Flex, Box, Heading, Text, Button, Container } from "@chakra-ui/react";
import RentForm from "../Services/RentForm"

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
  useColorModeValue
} from "@chakra-ui/react";
import { useState,  } from "react";

function RentYourSpace() {
  const [showRentForm, setShowRentForm] = useState(false);
  const bgColor = useColorModeValue("Body.bg", "Body.bg");
  const textColor = useColorModeValue("Body.text", "Body.text");


  return (
    <>  
      {/* <Navbar /> */}
      <Container  id="rent-space" bg={bgColor} color={textColor} overflowY="auto"
       p={4}  h="100vh" maxW="100vw" >
        <Flex
          direction={{ base: "column", md: "row" }}
          pt="14%"
          wrap="wrap"
        >
          <Box p={{ base: 2, md: 5 }} flex="1">
            <Heading size="xl" mb={3}>
              List Your Space
            </Heading>
            <Box className="regular" p={{ base: 4, md: 7 }}>
              <Text>
                Don't let it go to waste-turn it into a source of income by
                partnering with{" "}
                <Text as="span" fontWeight="bold">
                  Plotex
                </Text>
                ! Our seamless platform allows individuals and businesses to
                easily list their parking spaces. We'll connect you with a large
                community of drivers who are seeking convenient and safe parking
                solutions. Make the most of your empty space today and start
                earning with{" "}
                <Text as="span" fontWeight="bold">
                  PLOTEX
                </Text>
              </Text>
              <Button
                mt="2%"
                w={{ base: "100%", md: "10vw" }}
                borderRadius="1"
                bg={bgColor} color={textColor} 
                _hover={{ bg: "white" }}
                onClick={() => setShowRentForm(!showRentForm)}
              >
                List Now
              </Button>
            </Box>
          </Box>
          <Box p={{ base: 2, md: 5 }} flex="1">
            <Heading size="xl" mb={3}>
              Advantage
            </Heading>
            <Box p={{ base: 2, md: 5 }}>
              <Text mb={6} className="regular">
                You have the ability to list any parking space you own or have
                permission to offer, including driveways, garages, off-street
                parking, residential, or commercial areas.
              </Text>
              <Text mt={3} className="Semibold">
                Monthly Earnings Deposits
              </Text>
              <Text mt={3} className="regular">
                Earnings are automatically deposited to your designated bank
                account at the start of each month.
              </Text>
              <Text mt={3} className="Semibold">
                Set Your Availability
              </Text>
              <Text mt={3} className="regular">
                Determine when your space is open for rent, whether it's around
                the clock or during specific hours. Our calendar lets you
                establish your schedule, even for special events and seasonal
                demand.
              </Text>
            </Box>
          </Box>
        </Flex>
        <Modal   isOpen={showRentForm} onClose={() => setShowRentForm(false)}>
          <ModalOverlay />
          <ModalContent  color={textColor} maxW={{ base: '100%', md: '50vw' }} overflowY="auto" overflowX="auto" m="auto"  >
            <ModalHeader display="flex" justifyContent="center">List Your Space</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                  <RentForm />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>

    </>
  );
}


export default RentYourSpace;
