import React from "react";
import {
  Box,
  Badge,
  Image,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  Center,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} from "../Redux/Services/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CartSummary from "../Components/Cart/CartSummary";

const MyCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };
  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handledeleteItem = (index) => {
    dispatch(deleteItem({ index }));
  };
  console.log("items", items);
  return (
    <Flex style={{ minHeight: "90vh" }}>
      <Box flex={2}>
        {items?.length ? (
          <Box>
            <Stack spacing={4} align="center" m="10">
              {items.map((item, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  display="flex"
                  width="100%">
                  <Image
                    src={item.image}
                    alt={item.service_name}
                    width={"500px"}
                    height={"300px"}
                  />

                  <Box
                    p={10}
                    width="70%"
                    display="flex"
                    flexDirection={"column"}>
                    <div>
                      <Text
                        fontSize="3xl"
                        fontWeight="semibold"
                        noOfLines={1}
                        mb={30}>
                        {item.service_name}
                      </Text>
                      <Text fontSize="lg" mb={30}>
                        Provided By: {item.centerData.centerName}
                      </Text>
                    </div>

                    <hr />
                    <div>
                      <Flex alignItems="center" mt="10">
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
                          <DeleteIcon />
                        </Button>
                      </Flex>
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
            <Text fontSize="xl" textAlign="center">
              No items in the cart
            </Text>
          </Box>
        )}
      </Box>
      <Box flex={1} bg="gray.100" p="4" m="8">
        <CartSummary items={items}></CartSummary>
      </Box>
    </Flex>
  );
};

export default MyCart;
