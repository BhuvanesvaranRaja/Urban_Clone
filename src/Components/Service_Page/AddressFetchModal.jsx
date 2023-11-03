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
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";

import { useParams } from "react-router-dom";
import { getCoordinatesFromCityName } from "../../Utils/Coordinates";
import { useDispatch } from "react-redux";
import { address } from "../../Redux/Services/locationSlice";

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

const ServicePageModal = ({ isOpen, onClose }) => {
  const [markerPosition, setMarkerPosition] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const dispatch = useDispatch();
  const toast = useToast();
  const { city } = useParams();
  console.log("The city:", city);

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const coordinates = await getCoordinatesFromCityName(city);
        const markerPosition = {
          lat: parseFloat(coordinates.lat),
          lng: parseFloat(coordinates.lng),
        };
        setMarkerPosition(markerPosition);

        console.log("marker", markerPosition);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }

    fetchCoordinates();
  }, [city]);

  const handleMapClick = (event) => {
    console.log("Latitude:", event.latLng.lat());
    console.log("Longitude:", event.latLng.lng());
    setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setIsButtonDisabled(false);
    console.log("the marker positions", markerPosition);
  };

  const handleGetLocation = () => {
    console.log("in");
    dispatch(address(markerPosition));
    onClose();
    toast({
      title: "User Location/Address is set",
      status: "success",
      duration: 9000,
      position: "top-right",
      isClosable: false,
      containerStyle: {
        marginTop: "75px",
      },
    });
  };

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
          <MapComponent
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCA0z8oDsJ-I4xR2TVF6QAB1vS9GHvgli4&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "60vh" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            onMapClick={handleMapClick}
            markerPosition={markerPosition}
          />
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
