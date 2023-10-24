import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const ServiceCenters = ({ serviceCenters, service }) => {
  // Filter the service centers that match the selected service
  console.log("the sercivea", serviceCenters[0].service_categories);
  // const filteredServiceCenters = serviceCenters.filter((center) => {
  //   return center.service_categories.hasOwnProperty(service);
  // });

  // console. log("the oine", filteredServiceCenters);
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Service Centers for {service}
      </Text>
      {/* {filteredServiceCenters.map((center, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          mb={4}
          display="flex"
          flexDirection="column"
          alignItems="center">
          <Image src={center.image} alt={center.name} boxSize="150px" />
          <Text fontSize="lg" fontWeight="bold" mt={2}>
            {center.name}
          </Text>
          <Text fontSize="md" mt={2}>
            Address: {center.address}
          </Text>
          <Text fontSize="md">Phone: {center.phone}</Text>
          <Text fontSize="md">Description: {center.description}</Text>
        </Box>
      ))} */}
    </Box>
  );
};

export default ServiceCenters;
