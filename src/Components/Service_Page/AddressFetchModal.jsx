import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";

import { getCoordinatesFromCityName } from "../../Utils/Coordinates";
import { useDispatch, useSelector } from "react-redux";
import {
  address,
  location,
  locationMethod,
} from "../../Redux/Services/locationSlice";
import { getCityName } from "../../Utils/getCityInfo";

const MapComponent = withScriptjs(
  withGoogleMap(({ onMapClick, markerPosition }) => (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={markerPosition}
      onClick={onMapClick}>
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  ))
);
const ServicePageModal = ({ isOpen, onClose, closeDrawer }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [currentCityName, setCurrentCityName] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const city = useSelector((state) => state.location.location);

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const coordinates = await getCoordinatesFromCityName(city);
        const markerPosition = {
          lat: parseFloat(coordinates.lat),
          lng: parseFloat(coordinates.lng),
        };

        setMarkerPosition(markerPosition);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }

    fetchCoordinates();
  }, [city]);

  const handleMapClick = async (event) => {
    const cityName = await getCityName(event.latLng.lat(), event.latLng.lng());
    setCurrentCityName(cityName);
    setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setIsButtonDisabled(false);
  };

  const handleGetLocation = () => {
    if (currentCityName) {
      dispatch(address(markerPosition));
      dispatch(location({ city: currentCityName }));
      dispatch(locationMethod("city"));
      onClose();
      closeDrawer();
      toast({
        title: "User Location/Address is set",
        status: "success",
        duration: 800,
        position: "top-right",
        isClosable: false,
        containerStyle: {
          marginTop: "75px",
        },
      });
    }
  };
  const mapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"3xl"} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Please select your exact location
          <br />
          <span style={{ fontSize: "15px" }}>
            (use zoom in / out for selecting precise location)
          </span>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {markerPosition && (
            <MapComponent
              googleMapURL={mapURL}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "60vh" }} />}
              mapElement={<div style={{ height: "100%" }} />}
              onMapClick={handleMapClick}
              markerPosition={markerPosition}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleGetLocation}
            isDisabled={isButtonDisabled}>
            SET MY SERVICE LOCATION
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ServicePageModal;
