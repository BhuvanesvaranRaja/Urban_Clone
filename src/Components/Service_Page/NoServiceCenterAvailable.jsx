import React from "react";
import {
  Box,
  Text,
  Button,
  Center,
  VStack,
  List,
  ListItem,
} from "@chakra-ui/react";

const NoServiceCenterAvailable = () => {
  return (
    <Center padding={"30%"}>
      <VStack spacing={4} alignItems="center">
        <List>
          <ListItem
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            w={"8xl"}
            marginBottom={"50px"}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center">
            <Text fontSize="xl" mb={"10"}>
              Sorry, no service centers available nearby.
            </Text>
            <Button colorScheme="blue">Explore Other Locations</Button>
          </ListItem>
        </List>
      </VStack>
    </Center>
  );
};

export default NoServiceCenterAvailable;
