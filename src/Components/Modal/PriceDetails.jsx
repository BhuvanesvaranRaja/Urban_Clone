import {
  Button,
  Text,
  Box,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContactNumber } from "../../Redux/Services/AuthSlice";
const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.800"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
);
const PriceDetails = ({ center }) => {
  const services = center.services || [];
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.user);
  const [contactNumber, setContactNumber] = useState("");
  const [validationError, setValidationError] = useState(null);
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  console.log("from redux", userDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    if (userDetails.contact === null || userDetails.contact === "") {
      setIsModalOpen(true);
      setOverlay(<OverlayOne />);
    } else {
      console.log("Contact number alreay exist ");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleProceed = () => {
    if (
      !contactNumber ||
      contactNumber.trim() === "" ||
      contactNumber.length < 10
    ) {
      setValidationError("Please enter valid contact number");
      return;
    }
    dispatch(updateContactNumber(contactNumber));

    setIsModalOpen(false);
  };

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
              padding={"5"}>
              <Flex flexDirection={"column"}>
                <Text fontWeight="semibold">{service.service_name}</Text>
                <Text>{service.price}</Text>
              </Flex>
              <Button colorScheme="blue" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Flex>
            <hr />
          </div>
        ))}
      </ul>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
          {overlay}
          <ModalContent>
            <ModalHeader>
              Look's Like we dont have your contact number
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                placeholder="Please enter your contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
              {validationError && (
                <p style={{ color: "red" }}>{validationError}</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={handleProceed}
                size={"sm"}
                mx={"2"}>
                SAVE
              </Button>
              <Button colorScheme="red" onClick={closeModal} size={"sm"}>
                CLOSE
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default PriceDetails;
