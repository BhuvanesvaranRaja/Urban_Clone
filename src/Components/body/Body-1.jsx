import {
  Box,
  HStack,
  Image,
  Select,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import "../../StyleComponents/body_1.css";
import woman from "../../assets/woman_uc.png";
import { Cities } from "../../assets/Cities";
import { Link, useNavigate } from "react-router-dom";
import { getCityFromGeolocation } from "../../Utils/Location";

const Body_1 = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const handleChange = (value) => {
    setCity(value);
    localStorage.setItem("location", value);
    setIsButtonEnabled(true);
  };

  const handleNavigation = () => {
    navigate(`/${city}`);
  };

  const getLocation = async () => {
    console.log("in");
    try {
      const city = await getCityFromGeolocation();
      localStorage.setItem("location", city);

      setCity(city);
      setIsButtonEnabled(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Box className="hero" pos={"relative"}>
        <Image w={"56%"} src={woman} />

        <Box
          width={"100%"}
          height={"100%"}
          className="text"
          fontWeight={"bold"}
          pos={"absolute"}
          right="0.5"
          top={"0.5"}>
          <Box width={"44%"} marginLeft={"55%"} h={"100%"}>
            <VStack gap={5}>
              <Text className="heading">URBAN COMPANY</Text>
              <Text className="subHeading">
                Quality home services, on demand
              </Text>
              <br />
              <Text className="exp" w={"25rem"} textAlign={"left"}>
                Experienced, hand-picked Professionals to serve you at your
                doorstep
              </Text>
              <br />
              <Box
                bg={"whiteAlpha.900"}
                borderRadius={"8"}
                padding={"5"}
                color={"blackAlpha.900"}>
                <Text>Where do you need a service?</Text>
                <HStack spacing={2}>
                  <FaMapMarkerAlt
                    size={25}
                    style={{ verticalAlign: "middle" }}
                    // onClick={() => {
                    //   localStorage.setItem("location", A);
                    //   const loc = localStorage.getItem("location");
                    //   setCity(loc);
                    // }}
                    onClick={getLocation}
                  />
                  <Select
                    cursor={"pointer"}
                    placeholder="Select City"
                    value={city}
                    width={"20em"}
                    onChange={(e) => handleChange(e.target.value)}>
                    {Cities.map((item, index) =>
                      item.city ? (
                        <option
                          key={index}
                          style={{ cursor: "pointer" }}
                          value={item.city}>
                          {item.city}
                        </option>
                      ) : (
                        <option key={index} disabled value={item.country}>
                          {item.country}
                        </option>
                      )
                    )}
                  </Select>
                </HStack>
                <Button
                  onClick={handleNavigation}
                  marginTop={5}
                  backgroundColor={"black"}
                  color={"white"}
                  disabled={!isButtonEnabled}>
                  GO
                </Button>
              </Box>
            </VStack>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Body_1;
