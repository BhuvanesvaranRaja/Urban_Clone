import {
  Button,
  Text,
  Box,
  Flex,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContactNumber } from "../../Redux/Services/authSlice";
import GetContactModal from "./GetContactModal";
import LoginModal from "./LoginModal";
const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.700"
    backdropFilter="blur(100px) hue-rotate(50deg)"
  />
);
function PriceDetails({ center }) {
  const centerName = center.name;
  const services = center.services || [];
  const userDetails = useSelector((state) => state.auth.user);
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const toast = useToast();
  const userAvailability = localStorage.getItem("token");
  const [cartItems, setCartItems] = useState([]);
  console.log("items", cartItems);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log("from redux", userDetails);
  console.log("Cart items", cartItems);

  const handleAddToCart = (service) => {
    if (userAvailability === null) {
      setIsLoginModalOpen(true);
      console.log("user not logged");
      toast({
        title: "Please Log In",
        description: "You need to Log In to add items to your cart.",
        status: "error",
        position: "top-right",
        duration: 3000,
        containerStyle: {
          marginRight: "50px",
        },
        isClosable: false,
      });
    } else if (userDetails.contact === null || userDetails.contact === "") {
      setIsModalOpen(true);
      setOverlay(<OverlayOne />);
    } else {
      setCartItems([...cartItems, { service, quantity: 1, centerName }]);
    }
  };

  const incrementQuantity = (service) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.service.service_name === service.service_name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (service) => {
    const cartItem = cartItems.find(
      (item) => item.service.service_name === service.service_name
    );

    if (cartItem) {
      if (cartItem.quantity > 1) {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.service.service_name === service.service_name
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    }
  };

  return (
    <Box>
      <Text fontSize="x-large" fontWeight="bold" color={"blackAlpha"}>
        Services
      </Text>
      <ul>
        {services.map((service, index) => (
          <div key={index}>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              padding={"5"}>
              <Flex flexDirection={"column"}>
                <Text fontWeight="semibold">{service.service_name}</Text>
                <Text>{service.price}</Text>
              </Flex>
              {cartItems.find(
                (item) => item.service.service_name === service.service_name
              ) ? (
                <Flex alignItems="center">
                  <Button
                    colorScheme="blue"
                    onClick={() => decrementQuantity(service)}>
                    -
                  </Button>
                  <Text fontSize="xl" mx={2}>
                    {
                      cartItems.find(
                        (item) =>
                          item.service.service_name === service.service_name
                      ).quantity
                    }
                  </Text>
                  <Button
                    colorScheme="blue"
                    onClick={() => incrementQuantity(service)}>
                    +
                  </Button>
                </Flex>
              ) : (
                <Button
                  colorScheme="blue"
                  onClick={() => handleAddToCart(service)}>
                  Add to Cart
                </Button>
              )}
            </Flex>
            <hr />
          </div>
        ))}
      </ul>
      {isModalOpen && (
        <GetContactModal
          isOpen={isModalOpen}
          onClose={closeModal}
          overlay={overlay}
          isModalOpen={true}
        />
      )}
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          overlay={overlay}
        />
      )}
    </Box>
  );
}

export default PriceDetails;
