import React from "react";
import {
  Box,
  Text,
  Button,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ items }) => {
  const navigate = useNavigate();
  const calculateTotal = (price, quantity) => {
    const itemPrice = price.replace("₹", "");
    return parseInt(itemPrice) * quantity;
  };

  const calculateGrandTotal = () => {
    let grandTotal = 0;
    for (const item of items) {
      grandTotal += calculateTotal(item.price, item.quantity);
    }
    return grandTotal;
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Order Summary
      </Text>
      <Divider my="4" />
      {items.length === 0 ? (
        <Text m="5" fontSize={"xl"}>
          Your cart is empty.
        </Text>
      ) : (
        <Table variant="simple">
          <Thead bg={"blackAlpha.600"}>
            <Tr>
              <Th color={"black"} textAlign={"center"}>
                Service Name
              </Th>
              <Th color={"black"} textAlign={"center"}>
                Service Provider
              </Th>
              <Th color={"black"}>Price</Th>
              <Th color={"black"}>Quantity</Th>
              <Th color={"black"}>Subtotal</Th>
            </Tr>
          </Thead>
          <Tbody bg={"blackAlpha.200"}>
            {items.map((item, index) => (
              <Tr key={index}>
                <Td textAlign={"center"}>{item.service_name}</Td>
                <Td textAlign={"center"}>{item.centerData.centerName}</Td>
                <Td textAlign={"center"}>{item.price}</Td>
                <Td textAlign={"center"}>{item.quantity}</Td>
                <Td textAlign={"center"}>
                  ₹ {calculateTotal(item.price, item.quantity)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <Divider my="4" />
      {items.length > 0 && (
        <>
          <Text m="5">Total Items: {items?.length}</Text>
          <Box display="flex" justifyContent="space-between" m={"5"}>
            <Text fontWeight="bold" fontSize={"2xl"}>
              Total
            </Text>
            <Text fontWeight={"bolder"} fontSize={"3xl"}>
              ₹ {calculateGrandTotal()}
            </Text>
          </Box>
          <Button colorScheme="teal" size="lg" mt="4" w={"100%"}>
            Proceed to Checkout
          </Button>
        </>
      )}
      <Button
        colorScheme="teal"
        size="lg"
        mt="4"
        w={"100%"}
        onClick={() => navigate(-1)}>
        Continue Shopping
      </Button>
    </Box>
  );
};

export default CartSummary;
