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
  Container,
} from "@chakra-ui/react";
import { setDistancesAndDurations } from "../../Redux/Services/distancesAndDurationsSlice";
import CenterDetailModal from "../Modal/CenterDetailModal";
import OtherServices from "./OtherServices";

const ListView = ({ centers, service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [otherServices, setOtherServices] = useState([]);
  const [overlay, setOverlay] = React.useState();
  // console.log("the services", service);
  // console.log("the centers", centers);
  // console.log("the filtered centers/services", otherServices);

  const dispatch = useDispatch();
  const distancesAndDurations = useSelector(
    (state) => state.distancesDurations
  );
  // console.log("the distance", distancesAndDurations);
  const origin = "11.078128784112577,76.99973851549666";
  const apiKey = process.env.REACT_APP_DISTANCE_API_KEY;

  useEffect(() => {
    const calculateDistancesAndDurations = async () => {
      try {
        const destinations = centers[0]?.service_categories[service]?.map(
          (center) => `${center.latitude},${center.longitude}`
        );
        const destinationString = destinations?.join("|");
        // removed next to https://api
        const response = await fetch(
          `https:api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destinationString}&key=${apiKey}`
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
  useEffect(() => {
    if (centers && service) {
      const allServices = centers[0]?.service_categories;
      if (allServices) {
        const { [service]: _, ...otherServices } = allServices;
        setOtherServices(otherServices);
      }
    }
  }, [centers, service]);
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
    <div className="d-flex">
      <Box p={3}>
        <div className="d-flex w-100">
          <List>
            {centers[0]?.service_categories[service]?.map((center, index) => (
              <ListItem
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                p={10}
                mb={4}
                w={"6xl"}>
                <Flex
                  justifyContent="space-between"
                  bg={"#222f3e"}
                  color="white"
                  p={6}
                  border="1px solid white"
                  borderRadius="md"
                  boxShadow="lg"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.02)" }}>
                  <Box flex="1">
                    <Heading as="h2" size="lg" mb="5">
                      {center.name}
                    </Heading>
                    <Text fontSize="lg" p="3" letterSpacing={"wider"}>
                      Address:<span className="mx-3"> {center.address} </span>
                    </Text>
                    <Text fontSize="lg" p="3" letterSpacing={"wider"}>
                      Phone: {center.phone}
                    </Text>
                    <Text fontSize="lg" p="3" letterSpacing={"wider"}>
                      Distance: {distancesAndDurations[index]?.distance}
                    </Text>
                    <Text fontSize="lg" p="3" letterSpacing={"wider"}>
                      Estimated Duration to Reach:
                      {distancesAndDurations[index]?.duration}
                    </Text>
                    <Button
                      bg={"#c8d6e5"}
                      textColor={"black"}
                      mt={4}
                      onClick={() => handleOpenModal(center)}>
                      VIEW DETAILS
                    </Button>
                  </Box>
                  <Box>
                    <Image
                      src={center.image}
                      w="400px"
                      h="300px"
                      objectFit="cover"
                      borderRadius="md"
                      boxShadow="lg"
                    />
                  </Box>
                </Flex>
              </ListItem>
            ))}
          </List>
        </div>

        {selectedCenter && (
          <CenterDetailModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            center={selectedCenter}
            overlay={overlay}
          />
        )}
      </Box>
      <Container mt={"3"}>
        <OtherServices
          centers={centers}
          service={service}
          handleOpenModal={handleOpenModal}
        />
      </Container>
    </div>
  );
};

export default ListView;
