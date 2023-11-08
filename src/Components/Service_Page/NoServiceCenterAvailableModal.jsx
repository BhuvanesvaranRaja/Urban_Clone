import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  ListItem,
  List,
} from "@chakra-ui/react";

const NoServiceCenterAvailableModal = ({ isOpen, onClose, onExploreClick }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" fontSize="xl">
          Sorry, no service centers available nearby.
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} alignItems="center">
            <List>
              <ListItem
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center">
                <Button colorScheme="blue" onClick={onExploreClick}>
                  Explore Other Locations
                </Button>
              </ListItem>
            </List>
          </VStack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default NoServiceCenterAvailableModal;
