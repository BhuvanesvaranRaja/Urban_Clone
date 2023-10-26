import {
  Button,
  Container,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServiceModal from "../Modal/ServiceModal";

const ServicesCategory = ({ data }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = React.useState(null);
  const { city } = useParams();

  const handleClick = (index, service) => {
    console.log(`hello /${city}/${service}`);
    setSelectedService(service);
    onOpen();
  };
  return (
    <Container
      border="1px solid white"
      borderRadius={"5px"}
      boxShadow="rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"
      maxW="4xl"
      h="150px"
      mt="-5%"
      bg="white"
      display="flex"
      zIndex={-1}>
      {data[0].services.map((item, index) => (
        <Button
          h="80%"
          m="auto"
          bg="white"
          display="flex"
          flexDirection={"column"}
          justifyContent="space-around"
          fontSize={"15px"}
          key={item.id}
          onClick={() => handleClick(index, item.service_name)}>
          <Image src={item.image} name={item.service_name} borderRadius />
          <Text>{item.service_name}</Text>
        </Button>
      ))}
      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        selectedService={selectedService}
        city={city}
      />
    </Container>
  );
};

export default ServicesCategory;
