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
import Reviews from "./Reviews";
import PriceDetails from "./PriceDetails";
import AccordianComp from "../Modal/Accordian";

const CenterDetailModal = ({ isOpen, onClose, center, overlay }) => {
  console.log("received center data", center.reviews);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      {overlay}
      <ModalOverlay />
      <ModalContent>
        <Image src={center.image} height={"500px"} />
        <ModalHeader className="fs-3 text-danger">{center.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="fs-5">
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
