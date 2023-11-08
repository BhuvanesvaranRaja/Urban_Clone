import { Box, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HomeTopSection from "../Components/homepage/HomeTopSection";
import HomePageService from "../Components/homepage/HomePageService";
import { searchServices } from "../Utils/SearchResults";
import AddressFetchModal from "../Components/Service_Page/AddressFetchModal";
import { useDispatch } from "react-redux";
import LocationDrawer from "../Components/homepage/LocationDrawer";
import {
  address,
  location,
  locationMethod,
} from "../Redux/Services/locationSlice";
import { getCityName } from "../Utils/getCityInfo";

const Home = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [scrollNav, setScrollNav] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isAddressFetchModalOpen, setIsAddressFetchModalOpen] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const openAddressFetchModal = () => {
    setIsAddressFetchModalOpen(true);
  };

  const closeAddressFetchModal = () => {
    setIsAddressFetchModalOpen(false);
  };
  // current location
  const handleGetCurrentLocation = async () => {
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const currentLat = position.coords.latitude;
        const currentLng = position.coords.longitude;
        const city = await getCityName(currentLat, currentLng);
        console.log("this city", city);
        dispatch(address({ lat: currentLat, lng: currentLng }));
        dispatch(location({ city }));
        dispatch(locationMethod("current"));
        setIsDrawerOpen(false);
        toast({
          title: "Your current Location is set as your address",
          status: "success",
          duration: 800,
          position: "top-right",
          containerStyle: {
            marginTop: "80px",
          },
        });
      } else {
        throw new Error("Geolocation is not supported by your browser");
      }
    } catch (error) {
      console.error("Error getting current location:", error);
      toast({
        title: "Geolocation is not supported by your browser",
        status: "danger",
        duration: 800,
        isClosable: true,
        position: "top-right",
        containerStyle: {
          marginTop: "80px",
        },
      });
    }
  };

  const handleSetType = async (type) => {
    if (type === "map") {
      setIsAddressFetchModalOpen(true);
    } else if (type === "current") {
      handleGetCurrentLocation();
    } else {
      console.log("error");
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  useEffect(() => {
    if (query === "") {
      setSuggestions([]);
    } else {
      let newListofSuggestions = searchServices
        .filter((item) =>
          item.service.toLowerCase().indexOf(query) !== -1 ? true : false
        )
        .map((item) => item.service);
      setSuggestions(newListofSuggestions);
    }
    setTimeout(() => setLoading(false), 1000);
  }, [query]);

  return (
    <Box>
      <HomeTopSection
        loading={loading}
        onChange={(val) => setQuery(val)}
        setLoading={setLoading}
        suggestions={suggestions}
      />

      <HomePageService scrollNav={scrollNav} />

      {isDrawerOpen && (
        <LocationDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          handleSetType={handleSetType}
          openAddressFetchModal={openAddressFetchModal}
        />
      )}
      {isAddressFetchModalOpen && (
        <AddressFetchModal
          isOpen={isAddressFetchModalOpen}
          onClose={closeAddressFetchModal}
          closeDrawer={handleDrawerClose}
        />
      )}
    </Box>
  );
};

export default Home;
