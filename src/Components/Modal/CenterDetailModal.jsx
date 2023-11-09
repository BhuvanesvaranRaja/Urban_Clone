import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Box,
} from "@chakra-ui/react";
import ImageCarsoule from "../Service_Page/ImageCarsoule";
import Reviews from "./Reviews";
import PriceDetails from "./PriceDetails";
import AccordianComp from "../Modal/Accordian";

const CenterDetailModal = ({ isOpen, onClose, center, overlay }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      {overlay}
      <ModalOverlay />
      <ModalContent>
        <ImageCarsoule images={center.images} />
        <ModalHeader className="fs-3 text-danger">{center.name}</ModalHeader>
        <ModalCloseButton
          bg="red.700"
          color="white"
          padding={"10px"}
          fontWeight="bold"
          size={"sm"}
          _hover={{
            bg: "red.600",
            color: "white",
          }}
        />
        <ModalBody className="fs-5">
          <Box></Box>
          <p>Address: {center.address}</p>
          <p>Contact Number: {center.phone}</p>
          <Box mt={4}>
            <PriceDetails center={center} />
          </Box>
          <Box mt={4}>
            <AccordianComp />
          </Box>
          <Box mt={4}>
            <Reviews UserReviews={center} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CenterDetailModal;
