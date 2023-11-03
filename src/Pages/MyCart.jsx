import React, { useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Code,
  Button,
  Stack,
  Flex,
  Center,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  MinusIcon,
  ExternalLinkIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} from "../Redux/Services/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CartSummary from "../Components/Cart/CartSummary";
import { FaCartPlus, FaHeart } from "react-icons/fa";

const MyCart = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart);
  useEffect(() => {
    if (items.length === 0) {
      const timeoutId = setTimeout(() => {
        navigate(-1);
        console.log("No items in the cart. Navigating to another page...");
      }, 2000);

      // Cleanup the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [items]);

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };
  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handledeleteItem = (index) => {
    dispatch(deleteItem({ index }));
    toast({
      title: "Item Deleted",
      status: "error",
      position: "bottom",
      duration: 1000,
      containerStyle: {
        marginBottom: "100px",
      },
      isClosable: false,
    });
  };

  console.log("items in ", items);
  return (
    <Flex
      style={{
        // minHeight: "100vh",
        height: "fit-content",
        marginTop: "60px",
        marginBottom: "5%",
      }}>
      <Box flex={3}>
        {items?.length >= 1 ? (
          <Box>
            <Stack
              spacing={4}
              align="center"
              mt="10"
              // height="fit-content"
              // overflow="scroll"
            >
              {items.map((item, index) => (
                <Box
                  key={index}
                  p="5"
                  bg="blackAlpha.300"
                  borderWidth="1px"
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid gray"
                  width="95%">
                  <Image
                    src={item.image}
                    alt={item.service_name}
                    maxWidth={"fit-content"}
                    height="200px"
                    m="5"
                  />

                  <Box
                    p={10}
                    width="80%"
                    display="flex"
                    flexDirection={"column"}>
                    <div>
                      <Text fontSize="2xl" fontWeight="semibold" noOfLines={1}>
                        {item.service_name}
                      </Text>
                      <Text noOfLines={1} mb={"1"}>
                        <span className="fw-bolder text-success fs-4">
                          {item.price}
                        </span>
                        <span className="mx-2 fw-medium fs-6  ">/ service</span>
                      </Text>
                      <Text fontSize="lg" mb={"1"}>
                        Provided by
                        <Code colorScheme="red" mx={"3"} fontSize={"17"}>
                          {item.centerData.centerName}
                        </Code>
                      </Text>{" "}
                      <Text fontSize="lg" mb={"1"}>
                        Provider Contact Number :
                        <Code colorScheme="green" mx={"3"} fontSize={"17"}>
                          {item.centerData.centerContact}
                        </Code>
                      </Text>
                      <Text fontSize="lg" mb={"2"}>
                        Ratings :{" "}
                        {Array(item.stars)
                          .fill()
                          .map((_, index) => (
                            <span key={index} role="img" aria-label="star">
                              <StarIcon color="yellow.400" mx={"1"} />
                            </span>
                          ))}
                      </Text>
                    </div>

                    <hr />
                    <div>
                      <Box>
                        <Flex alignItems="center" mt={"3"}>
                          <Center>
                            <IconButton
                              icon={<MinusIcon />}
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDecreaseQuantity(item.id)}
                            />
                          </Center>
                          <Text fontSize="lg" mx={4}>
                            {item.quantity}
                          </Text>
                          <Center>
                            <IconButton
                              icon={<AddIcon />}
                              colorScheme="teal"
                              size="sm"
                              onClick={() => handleIncreaseQuantity(item.id)}
                            />
                          </Center>
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => handledeleteItem(index)}
                            ml={4}>
                            Delete <DeleteIcon mx="2" />
                          </Button>
                          <Button colorScheme="orange" size="sm" ml={4}>
                            Share
                            <ExternalLinkIcon mx="2" />
                          </Button>{" "}
                          <Button colorScheme="orange" size="sm" ml={4}>
                            Add to favorite
                            <FaHeart className="mx-2" />
                          </Button>
                        </Flex>
                      </Box>
                    </div>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        ) : (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"80vh"}>
            <Text fontSize="3xl" textAlign="center">
              No items in the cart... Navigating back
            </Text>
            <FaCartPlus className="fs-3 mx-3" />
          </Box>
        )}
      </Box>
      <Box
        flex={2}
        bg="gray.100"
        p="4"
        mt="10"
        mr="10"
        borderRadius="12"
        border="1px solid gray"
        // height="fit-content"
        // height={"90vh"}
        // overflow={"scroll"}
      >
        <CartSummary items={items}></CartSummary>
      </Box>
    </Flex>
  );
};

export default MyCart;
