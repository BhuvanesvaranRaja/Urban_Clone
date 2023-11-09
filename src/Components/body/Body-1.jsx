import { Box, HStack, Image, Select, Text, VStack } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import "../../StyleComponents/body_1.css";
import woman from "../../assets/woman_uc.png";
import { Cities } from "../../assets/Cities";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { location, locationMethod } from "../../Redux/Services/locationSlice";

const Body_1 = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleChange = (value) => {
    setCity(value);
    setIsButtonEnabled(true);
  };

  const handleNavigation = () => {
    dispatch(location({ city }));
    dispatch(locationMethod("city"));
    navigate(`/home`);
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
                <Text marginBottom="3">Where do you need a service?</Text>
                <HStack spacing={2}>
                  <FaMapMarkerAlt
                    size={25}
                    style={{ verticalAlign: "middle" }}
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
                  className="mt-4 bg-black w-100 border-0"
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
