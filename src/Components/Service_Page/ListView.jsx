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
import StarRating from "./StarRating";
import NoServiceCenterAvailable from "./NoServiceCenterAvailable";

const ListView = ({ centers, service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [otherServices, setOtherServices] = useState([]);
  const [overlay, setOverlay] = React.useState();
  const dispatch = useDispatch();

  const UserLocation = useSelector((state) => state.location.address);
  // const distance = useSelector((state) => state.setDistancesAndDurations);
  const apiKey = process.env.REACT_APP_DISTANCE_API_KEY;
  // const data = localStorage.getItem("distanceAndDuration");
  // useEffect(() => {
  //   const calculateDistancesAndDurations = async () => {
  //     if (UserLocation) {
  //       const OriginString = `${UserLocation.lat},${UserLocation.lng}`;

  //       try {
  //         const destinations = centers[0]?.service_categories[service]?.map(
  //           (center) => `${center.latitude},${center.longitude}`
  //         );
  //         const destinationString = destinations?.join("|");
  //         const response = await fetch(
  //           `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${OriginString}&destinations=${destinationString}&key=${apiKey}`
  //         );

  //         if (response.ok) {
  //           const data = await response.json();
  //           const distancesAndDurations = await data.rows[0].elements?.map(
  //             (element) => {
  //               return {
  //                 distance: element.distance?.text,
  //                 duration: element.duration?.text,
  //               };
  //             }
  //           );
  //           dispatch(setDistancesAndDurations(distancesAndDurations));
  //         } else {
  //           console.error("Error fetching distance and duration data");
  //         }
  //       } catch (error) {
  //         console.error("Error fetching distance and duration data", error);
  //       }
  //     }
  //   };

  //   calculateDistancesAndDurations();
  // }, [UserLocation, centers, service, apiKey, dispatch]);

  useEffect(() => {
    if (centers && service) {
      const allServices = centers[0]?.service_categories;
      if (allServices) {
        const { [service]: _, ...remainingServices } = allServices;
        setOtherServices(remainingServices);
      }
    }
  }, [centers, service]);

  const OverlayTwo = () => (
    <ModalOverlay
      bg="blackAlpha.600"
      backdropFilter="blur(5px) hue-rotate(20deg)"
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

  const calculateAverageRatings = (center) => {
    if (!center || !center.reviews || center.reviews.length === 0) {
      return 0;
    }

    let totalStars = 0;
    let totalReviews = 0;
    center.reviews.forEach((review) => {
      totalStars += review.stars;
      totalReviews++;
    });

    if (totalReviews === 0) return 0;

    const averageStars = totalStars / totalReviews;
    return averageStars;
  };

  return (
    <div className="d-flex">
      {centers?.length === 0 ? (
        <>
          <NoServiceCenterAvailable />
        </>
      ) : (
        <>
          <Box p={3}>
            <div className="d-flex w-100">
              <List>
                {centers[0]?.service_categories[service]?.map(
                  (center, index) => (
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
                        p={5}
                        border="1px solid white"
                        borderRadius="md"
                        boxShadow="lg"
                        transition="transform 0.2s"
                        _hover={{ transform: "scale(1.02)" }}>
                        <Box flex="1">
                          <Heading as="h2" size="lg" mb="3">
                            {center.name}
                          </Heading>
                          <Text fontSize="lg" p="1" letterSpacing={"wider"}>
                            {center.description}
                          </Text>
                          <Text fontSize="lg" p="1" letterSpacing={"wider"}>
                            Address:{" "}
                            <span className="mx-3">{center.address}</span>
                          </Text>
                          <Text fontSize="lg" p="1" letterSpacing={"wider"}>
                            Phone: {center.phone}
                          </Text>
                          <Flex alignItems="center">
                            <Text fontSize="lg" p="1" letterSpacing={"wider"}>
                              Average Ratings:
                            </Text>
                            <StarRating
                              rating={calculateAverageRatings(center)}
                            />
                          </Flex>
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
                  )
                )}
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
        </>
      )}
    </div>
  );
};

export default ListView;
