import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  ModalOverlay,
} from "@chakra-ui/react";
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { setDistancesAndDurations } from "../Redux/Services/distancesAndDurationsSlice";
import CenterDetailModal from "../Components/Modal/CenterDetailModal";

const ListView = ({ centers, service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [overlay, setOverlay] = React.useState();

  const dispatch = useDispatch();
  const distancesAndDurations = useSelector(
    (state) => state.distancesDurations
  );
  console.log("the distance", distancesAndDurations);

  const origin = "11.078128784112577,76.99973851549666";
  const apiKey = process.env.REACT_APP_DISTANCE_API_KEY;

  useEffect(() => {
    const calculateDistancesAndDurations = async () => {
      try {
        const destinations = centers[0]?.service_categories[service]?.map(
          (center) => `${center.latitude},${center.longitude}`
        );
        const destinationString = destinations?.join("|");

        const response = await fetch(
          `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destinationString}&key=${apiKey}`
        );

        if (response.ok) {
          const data = await response.json();
          const distancesAndDurations = data.rows[0].elements?.map(
            (element) => ({
              distance: element.distance?.text,
              duration: element.duration?.text,
            })
          );
          dispatch(setDistancesAndDurations(distancesAndDurations));
        } else {
          console.error("Error fetching distance and duration data");
        }
      } catch (error) {
        console.error("Error fetching distance and duration data", error);
      }
    };

    calculateDistancesAndDurations();
  }, [centers, service, origin, apiKey, dispatch]);
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const handleOpenModal = (center) => {
    setSelectedCenter(center);
    setIsModalOpen(true);
    setOverlay(<OverlayTwo />);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box p={3}>
      <List>
        {centers[0]?.service_categories[service]?.map((center, index) => (
          <ListItem
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            p={5}
            mb={4}
            w={"8xl"}>
            <Flex justifyContent="space-between">
              <Box padding={"8"}>
                <Heading as="h2" size="md">
                  {center.name}
                </Heading>
                <Text>Address: {center.address}</Text>
                <Text>Phone: {center.phone}</Text>
                <Text>Distance: {distancesAndDurations[index]?.distance}</Text>
                <Text>
                  Estimated Duration to Reach:
                  {distancesAndDurations[index]?.duration}
                </Text>

                <Button
                  className="mt-3"
                  color={"red"}
                  onClick={() => handleOpenModal(center)}>
                  VIEW DETAILS
                </Button>
              </Box>
              <Image src={center.image} w="250px" h="180px" />
            </Flex>
          </ListItem>
        ))}
      </List>
      {selectedCenter && (
        <CenterDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          center={selectedCenter}
          overlay={overlay}
        />
      )}
    </Box>
  );
};

export default ListView;
