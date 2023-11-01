import React, { useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
} from "@chakra-ui/react";

const NotificationPopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopover = () => {
    setIsOpen(true);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  // Generate random notification content
  const notifications = [
    "You have a new message",
    "A new friend request",
    "Reminder: Meeting at 3 PM",
  ];

  const randomNotification = () => {
    const index = Math.floor(Math.random() * notifications.length);
    return notifications[index];
  };

  return (
    <Popover placement="bottom" isOpen={isOpen} onClose={closePopover}>
      <PopoverTrigger></PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Notifications</PopoverHeader>
        <PopoverBody>
          <Text>abc</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
