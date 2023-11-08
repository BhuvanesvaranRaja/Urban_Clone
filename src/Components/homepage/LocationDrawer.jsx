import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import AddressFetchModal from "../Service_Page/AddressFetchModal";
import { FaLandmark, FaLocationArrow, FaMap } from "react-icons/fa";

const LocationDrawer = ({ isOpen, onClose, handleSetType }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>WE NEED YOUR ADDRESS !!</DrawerHeader>
          <DrawerBody>
            <Button
              onClick={() => {
                handleSetType("current");
              }}
              mb={4}
              mt={"70%"}
              w={"100%"}
              colorScheme={selectedOption === "current" ? "blue" : "red"}>
              Use my Current Location
              <FaLocationArrow className="mx-3" />
            </Button>
            <br />
            <span
              style={{
                marginLeft: "50%",
              }}>
              (or)
            </span>
            <br />
            <Button
              onClick={() => {
                handleSetType("map");
              }}
              mb={4}
              mt={5}
              w={"100%"}
              colorScheme={selectedOption === "map" ? "blue" : "green"}>
              Select Location on Map
              <FaLandmark className="mx-3" />
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <AddressFetchModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default LocationDrawer;
