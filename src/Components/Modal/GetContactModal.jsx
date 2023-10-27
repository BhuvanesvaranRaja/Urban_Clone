// GetContactModal.js
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
  console.log("from redux", userDetails);
  const handleProceed = () => {
    if (
      !contactNumber ||
      contactNumber.trim() === "" ||
      contactNumber.length < 10
    ) {
      setValidationError("Please enter valid contact number");
      return;
    }
    dispatch(updateContactNumber(contactNumber));
    localStorage.setItem(
      "userDetails",
      JSON.stringify({ ...userDetails, contact: contactNumber })
    );

    onClose();
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
