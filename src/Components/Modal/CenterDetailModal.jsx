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
  console.log("this is the center modal", center);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      {overlay}
      <ModalOverlay />
      <ModalContent p="5">
        {/* <Image src={center.image} height={"500px"} /> */}
        <ImageCarsoule images={center.images} />
        <ModalHeader className="fs-3 text-danger">{center.name}</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody className="fs-5">
          <Box>
            
          </Box>
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
