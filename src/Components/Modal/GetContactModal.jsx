import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateContactNumber } from "../../Redux/Services/authSlice";

const GetContactModal = ({ isOpen, onClose, overlay }) => {
  const [contactNumber, setContactNumber] = useState("");
  const [validationError, setValidationError] = useState(null);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.user);

  const handleProceed = () => {
    const validContactNumber = /^\d{10}$/;

    if (!contactNumber || !validContactNumber.test(contactNumber)) {
      setValidationError("Please enter a valid 10-digit contact number");
      return;
    }

    dispatch(updateContactNumber(contactNumber));
    localStorage.setItem(
      "userDetails",
      JSON.stringify({ ...userDetails, contact: contactNumber })
    );

    onClose();
  };

  const handleInputKeyUp = (e) => {
    if (e.key === "Enter") {
      handleProceed();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      {overlay}
      <ModalContent>
        <ModalHeader>Looks like we don't have your contact number</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Please enter your contact number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
          {validationError && <p style={{ color: "red" }}>{validationError}</p>}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleProceed} size="sm" mx="2">
            SAVE
          </Button>
          <Button colorScheme="red" onClick={onClose} size="sm">
            CLOSE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GetContactModal;
