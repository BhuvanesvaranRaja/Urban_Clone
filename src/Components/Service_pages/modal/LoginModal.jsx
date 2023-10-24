import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Login from "../../Authentication/Login";
import Signup from "../../Authentication/SignUp";

const LoginModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={"4xl"}
      variant="enclosed">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            isFitted
            variant="enclosed"
            colorScheme="blue"
            size="md"
            isLazy
            padding={"10"}>
            <TabList mb="2em">
              <Tab
                fontSize={"xl"}
                onClick={() => handleTabChange("login")}
                _selected={{
                  color: "white",
                  bg: "black",
                }}>
                LOGIN
              </Tab>
              <Tab
                fontSize={"xl"}
                onClick={() => handleTabChange("signup")}
                _selected={{
                  color: "white",
                  bg: "black",
                }}>
                SIGN-UP
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login onClose={onClose} />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
