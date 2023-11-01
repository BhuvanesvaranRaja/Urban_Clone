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
import {
  decreaseQuantity,
  increaseQuantity,
  addToCart,
} from "../../Redux/Services/cartSlice";
import GetContactModal from "./GetContactModal";
import LoginModal from "./LoginModal";

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.700"
    backdropFilter="blur(100px) hue-rotate(50deg)"
  />
);

function PriceDetails({ center }) {
  const services = center.services || [];
  const userDetails = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart);
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const userAvailability = localStorage.getItem("token");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = (service) => {
    // Check for user login
    if (userAvailability === null) {
      setIsLoginModalOpen(true);
      toast({
        title: "Please Log In to Continue",
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
      const centerData = {
        centerName: center.name,
        centerImage: center.image,
        centerContact: center.phone,
        centerAddress: center.address,
        centerReviwes: center.reviews,
      };

      dispatch(addToCart({ centerData, serviceData: service }));
      toast({
        title: "New Item Added",
        status: "success",
        position: "top-right",
        duration: 3000,
        containerStyle: {
          marginRight: "50px",
        },
        isClosable: false,
      });
    }
  };

  const getServiceQuantity = (service) => {
    const cartItem = cartItems.find((item) => item.id === service.id);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <Box>
      <Text fontSize="x-large" fontWeight="bold" color={"blackAlpha"}>
        Services
      </Text>
      <ul>
        {services.map((service) => {
          const quantity = getServiceQuantity(service);
          return (
            <div key={service.id}>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                padding={"5"}>
                <Flex flexDirection={"column"}>
                  <Text fontWeight="semibold">{service.service_name}</Text>
                  <Text>{service.price}</Text>
                </Flex>
                <div>
                  {quantity >= 1 ? (
                    <Flex alignItems="center">
                      <Button
                        colorScheme="teal"
                        size="md"
                        mx="4"
                        onClick={() =>
                          dispatch(decreaseQuantity({ id: service.id }))
                        }>
                        -
                      </Button>
                      <Text>{quantity}</Text>
                      <Button
                        colorScheme="teal"
                        size="md"
                        mx="4"
                        onClick={() =>
                          dispatch(increaseQuantity({ id: service.id }))
                        }>
                        +
                      </Button>
                    </Flex>
                  ) : (
                    <Button
                      px={"7"}
                      colorScheme="red"
                      onClick={() => handleAddToCart(service)}>
                      Add to Cart
                    </Button>
                  )}
                </div>
              </Flex>
              <hr />
            </div>
          );
        })}
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
