import React, { useState } from "react";
import {
  Button,
  Text,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";

const PriceDetails = ({ center }) => {
  const services = center.services || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactNumber, setContactNumber] = useState("");

  return (
    <Box>
      <Text fontSize="x-large" fontWeight="bold" color={"blackAlpha"}>
        Services
      </Text>
      <ul>
        {services.map((service, index) => (
          <div key={index}>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              padding={5}>
              <Flex flexDirection="column">
                <Text fontWeight="semibold">{service.service_name}</Text>
                <Text>{service.price}</Text>
              </Flex>

              <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
                Add to Cart
              </Button>
            </Flex>
            <hr />
          </div>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add to Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Please enter your contact number:</Text>
            <Input
              type="tel"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                // You can use contactNumber as needed, e.g., submit it to a server
                setIsModalOpen(false);
              }}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PriceDetails;
