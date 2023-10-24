import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { GoTriangleDown } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import axios from "axios";
import ServicesCategory from "../ServicesCategory";
import styles from "../../StyleComponents/Home.module.css";
import { useThrottle } from "use-throttle";
import { useNavigate, useParams } from "react-router-dom";
import { getCityFromGeolocation } from "../../Utils/Location";

const HomeTopSection = ({ loading, setLoading, onChange, suggestions }) => {
  const { city } = useParams();
  const [inputText, setInputText] = useState("");
  const [InitialLocation, setInitialLocation] = useState(`${city}`);
  const [servicesData, setServicesData] = useState(null);

  const [active, setActive] = useState(0);
  const scrollRef = useRef();
  const throttledText = useThrottle(inputText, 1000);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8088/cities?city=${city}`)
      .then((response) => setServicesData(response.data));
  }, []);
  useEffect(() => {
    onChange(throttledText);
  }, [throttledText, onChange]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setLoading(true);
  };

  const searchResult = (item) => {
    // navigate(`/:city/${item}/services`);
    navigate(`/:city/services=${item}`);
  };
  //function
  async function main() {
    try {
      const city = await getCityFromGeolocation();
      setInitialLocation(city);
      // navigate(`/city=${city}`);
      console.log("navigated");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Box>
      <Box className={styles.homeTopBox}>
        <Container color="whitesmoke" fontSize={"12px"}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{InitialLocation}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
        <Heading
          as={"h1"}
          fontSize="48px"
          fontWeight="500"
          color="white"
          lineHeight={"72px"}>
          Home services, on demand.
        </Heading>
        <br />
        <br />
        <Container
          maxW="3xl"
          lineHeight={"24px"}
          h="300px"
          mt="20%"
          position="absolute">
          <Flex h="60px" justifyContent={"space-between"}>
            <Flex
              alignItems={"center"}
              bgColor={"whitesmoke"}
              borderRadius="5px"
              w="25%">
              <Image
                w="35px"
                src="https://images.urbanclap.com/image/upload//q_auto,f_auto,fl_progressive:steep/t_medium_res_template/v1514444369/Flag_of_India_28Dec2017-1.png"
                alt="flag"
                m="5%"
              />
              <Text>{InitialLocation}</Text>
              <Popover isLazy>
                <PopoverTrigger>
                  <Button bg="whitesmoke">
                    <GoTriangleDown />
                  </Button>
                </PopoverTrigger>
                <PopoverContent mt="3%" w="40vh" h="75px">
                  <PopoverArrow ml="-8rem" />
                  <PopoverCloseButton />
                  <PopoverBody mt="3%" h="40%">
                    <Button onClick={main}>Get Current Location</Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
            <Flex w="70%" h="100%" len={suggestions.length}>
              <Button
                borderRadius={"5px 0 0 5px"}
                h="100%"
                bg="whitesmoke"
                fontSize={"30px"}
                pb="5%">
                <AiOutlineSearch />
              </Button>
              <Input
                value={inputText}
                onChange={handleInputChange}
                w="100%"
                borderRadius={"0 5px 5px 0"}
                h="100%"
                bg="whitesmoke"
                focusBorderColor="none"
                placeholder="Search for services"
              />
            </Flex>
          </Flex>
          {/* search result box */}
          {suggestions.length > 0 && (
            <Box
              className={styles.searchResultBox}
              len={suggestions.length}
              limit={5}
              active={active}
              ref={scrollRef}>
              {suggestions.map((item, index) => {
                return (
                  <Box
                    key={index}
                    _hover={{ bgColor: "purple.100" }}
                    className={styles.suggestions}
                    onClick={() => {
                      searchResult(index);
                    }}>
                    {item}
                  </Box>
                );
              })}
            </Box>
          )}
        </Container>

        <br />
        <Container color="white" marginLeft="37%">
          <Breadcrumb separator=",">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Women's Therapies</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Salon for Men</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Men's Therapies</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
      </Box>
      {servicesData && <ServicesCategory data={servicesData} />}
    </Box>
  );
};

export default HomeTopSection;
