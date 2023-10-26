import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import axios from "axios";
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function LargeWithAppLinksAndSocial() {
  const city = localStorage.getItem("location");
  // const [availableCity, setAvailableCity] = useState();
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8088/service_centers`)
  //     .then((response) => {
  //       setAvailableCity(response.data);
  //     })

  //     .catch((error) => {
  //       console.error("Axios Error:", error);
  //     });
  // }, []);

  return (
    <Box bg={useColorModeValue("black", "gray.900")}>
      <Container
        color={"whiteAlpha.900"}
        bg={"blackAlpha.900"}
        as={Stack}
        maxW={"6xl"}
        py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link to={"/aboutus"}>About Us</Link>
            <Link to={"/blog"}>Blog</Link>
            <Link to={"/contactus"}>Contact Us</Link>
            <Link to={"/tandc"}>Terms and conditions</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Link to={"/cookies"}>Cookies Policy</Link>
            <Link to={"/privacy"}>Privacy Policy</Link>
            <Link to={"/tandc"}>Terms of Service</Link>
            <Link to={"/law"}>Law Enforcement</Link>
          </Stack>
          {/* <div>
            <ListHeader className="mb-5">Serving In </ListHeader>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3}>
              {availableCity?.map((cityName, index) => {
                return (
                  <div key={index}>
                    <Link to={`/${cityName.city}`}>
                      <Badge bg="success" className="me-2">
                        {cityName.city}
                      </Badge>
                    </Link>
                  </div>
                );
              })}
            </SimpleGrid>
          </div> */}
          <Stack align={"flex-start"}>
            <ListHeader>For Partners</ListHeader>
            <Link to={"/register"}>Register as Professional</Link>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          color={"white"}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}>
          <Text>© 2022 Urban Company. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
