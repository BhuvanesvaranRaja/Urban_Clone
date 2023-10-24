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
  Badge,
  Box,
} from "@chakra-ui/react";

const ServiceModal = ({ isOpen, onClose, service }) => {
  if (!service) {
    return null;
  }
  console.log(service);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{service.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{service.description}</p>
          <p>{service.address}</p>
          <p>
            Phone: <Badge color={"red"}>{service.phone}</Badge>
          </p>

          {service.services.map((item, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p="2"
              m={"4"}
              backgroundColor={"green.100"}>
              <h1>{item.service_name}</h1>
              <p>Price: {item.price}</p>
              <p>Description: {item.description}</p>
            </Box>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ServiceModal;
