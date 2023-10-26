import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";

const LogoutConfirmationDialog = ({ isOpen, onClose, onConfirm, onCancel }) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={undefined}
      onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Logout Confirmation
          </AlertDialogHeader>
          <AlertDialogBody>Are you sure you want to logout?</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onCancel}>Cancel</Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default LogoutConfirmationDialog;
