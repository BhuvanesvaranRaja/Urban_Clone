import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const SalonForMenModal = ({ service, onClose }) => {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8080/services");
        if (Array.isArray(response.data) && response.data.length > 0) {
          const allServicesData = response.data[0];

          // Modify this part to handle different service categories
          const serviceDataKey = `${service.toLowerCase()}_data`;
          const specificServiceData = allServicesData[serviceDataKey] || [];

          setServiceData(specificServiceData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [service]);

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Salon Services - {service}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {serviceData.length > 0 ? (
            <>
              {serviceData.map((item) => (
                <div key={item.id}>
                  <Text>{item.Title}</Text>
                  {/* Add more fields as needed */}
                </div>
              ))}
            </>
          ) : (
            <Text>No data found for the selected service.</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <button onClick={onClose}>Close</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SalonForMenModal;
