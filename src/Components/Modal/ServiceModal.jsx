import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

const     ServiceModal = ({ isOpen, onClose, selectedService, city }) => {
  const [subServices, setSubServices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchSubServices() {
      if (isOpen) {
        try {
          const response = await axios.get(
            `http://localhost:8088/cities?city=${city}`
          );
          const selectedCity = response.data.find((item) => item.city === city);
          if (selectedCity) {
            const selectedServiceData = selectedCity.services.find(
              (service) => service.service_name === selectedService
            );
            if (selectedServiceData) {
              setSubServices(selectedServiceData.sub_services);
            }
          }
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      }
    }

    fetchSubServices();
  }, [isOpen, selectedService, city]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Sub-Services for {selectedService} in {city}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={"grid"}
          gap={"10"}
          gridTemplateColumns={"30% 30% 30%"}>
          {subServices.map((subService, index) => (
            <div key={index}>
              <Button
                variant="ghost"
                onClick={() => handleSubServiceClick(subService, city)}
                display="flex"
                alignItems="center"
                margin={"10"}>
                <Image
                  src={subService.image}
                  alt={subService.name}
                  boxSize="50px"
                />
                <Text marginLeft="1rem">{subService.name}</Text>
              </Button>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  function handleSubServiceClick(subService, city) {
    navigate(`/${city}/services=${subService.name}`);
    console.log("sub", subService.name);
    console.log(city);
    
  }
};

export default ServiceModal;
