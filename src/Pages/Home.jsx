import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import HomeTopSection from "../Components/homepage/HomeTopSection";
import HomePageService from "../Components/homepage/HomePageService";
import { searchServices } from "../Utils/SearchResults";
import AddressFetchModal from "../Components/Service_Page/AddressFetchModal";
import LandingPage_Navbar from "../Components/Navbar/LandingPg_Navbar";
import LargeWithAppLinksAndSocial from "../Components/Footer/Footer";
import { useSelector } from "react-redux";

const Home = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [scrollNav, setScrollNav] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentAddress = useSelector((state) => state.location.address);

  useEffect(() => {
    if (currentAddress) {
      setIsModalOpen(true);
    }
  }, [currentAddress]);

  const closeModal = () => {
    setIsModalOpen(false);
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
      {/* <LargeWithAppLinksAndSocial /> */}
      <AddressFetchModal isOpen={isModalOpen} onClose={closeModal} />
    </Box>
  );
};

export default Home;
