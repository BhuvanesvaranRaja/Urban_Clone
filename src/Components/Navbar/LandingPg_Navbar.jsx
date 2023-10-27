import {
  Box,
  Flex,
  HStack,
  useDisclosure,
  Image,
  Button,
  Text,
  Avatar,
  Select,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Menu,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogout } from "react-google-login";
import { Link, useParams, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Services/authSlice";
import { FacebookLoginClient } from "@greatsumini/react-facebook-login";
import LoginModal from "../Modal/LoginModal";
import LogoutConfirmationDialog from "../Modal/LogoutConfirmationDialog";
import { getCityFromGeolocation } from "../../Utils/Location";
import { GoLocation } from "react-icons/go";
import { Cities } from "..//../assets/Cities";

function LandingPage_Navbar() {
  const token = useSelector((state) => state.auth.token);
  const loginMethod = useSelector((state) => state.auth.loginMethod);
  const currentUser = JSON.parse(localStorage.getItem("userDetails"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { city } = useParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
  const [nearCity, setNearCity] = useState("");
  const [currentCity, setCurrentCity] = useState(city);
  const [selectLocation, setSelectLocation] = useState("");

  useEffect(() => {
    city === undefined
      ? setCurrentCity("Select a Location")
      : setCurrentCity(city);
  }, [city]);

  // console.log("login by", loginMethod);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };
  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setSelectLocation(newLocation);

    // Navigate to the selected location
    if (newLocation) {
      navigate(`/${newLocation}`);
    }
  };

  const handleLogout = () => {
    setIsLogoutAlertOpen(true);
  };

  const confirmLogout = () => {
    switch (loginMethod) {
      case "google":
        signOut();
        break;
      case "facebook":
        handleFacebookLogout();
        break;

      default:
        dispatch(logout());
        break;
    }
    setIsLogoutAlertOpen(false);
  };

  const cancelLogout = () => {
    setIsLogoutAlertOpen(false);
  };

  const { signOut } = useGoogleLogout({
    clientId:
      "1095168063845-kehnkv6r9kg7nc94id7tpm69sv0lafjf.apps.googleusercontent.com",
    onLogoutSuccess: () => {
      console.log("Logged out from Google");
      dispatch(logout());
    },
  });

  const handleFacebookLogout = () => {
    FacebookLoginClient.logout(() => {
      console.log("logout completed!");
      dispatch(logout());
    });
  };
  const goToNearMe = async () => {
    try {
      const city = await getCityFromGeolocation();
      setNearCity(city);
      navigate(`/${city}/near-me`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchLocation = async () => {
    try {
      if (city) {
        const Currentcity = await getCityFromGeolocation();
        setSelectLocation(Currentcity);
        const currentURL = window.location.href;
        const newURL = currentURL.replace(`${city}`, `${Currentcity}`);
        window.location.href = newURL;
      } else {
        const Currentcity = await getCityFromGeolocation();
        navigate(`/${Currentcity}`);
      }
    } catch (error) {
      console.error("Error fetching the location ", error);
    }
  };
  console.log("user is ", currentUser);
  return (
    <>
      <Box bg={"blackAlpha.800"} color={"whiteAlpha.900"} px={4} w={"100%"}>
        <Flex
          h={16}
          alignItems={"center"}
          fontWeight={"bold"}
          justifyContent={"space-around"}>
          <HStack
            width={"90%"}
            spacing={8}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <Flex alignItems="center">
              <Link to={`/`}>
                <Image
                  src="https://res.cloudinary.com/urbanclap/image/upload/images/growth/home-screen/1631097450980-d2de38.png"
                  width={"30%"}
                />
              </Link>
            </Flex>
            <HStack as={"nav"}>
              <Popover isLazy>
                <PopoverTrigger>
                  <Button colorScheme={"blackAlpha"} bg="black" p={"5"} mx="3">
                    <span className="mx-2">{currentCity}</span>
                    <GoLocation />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  modifiers={[
                    { name: "offset", options: { offset: [0, 10] } },
                    { name: "preventOverflow", options: { padding: 10 } },
                    { name: "flip", options: { padding: 10 } },
                  ]}>
                  <PopoverArrow ml="0rem" />
                  <PopoverCloseButton />
                  <PopoverBody bg={"white"}>
                    <Button
                      colorScheme={"blackAlpha"}
                      color={"white"}
                      width={"100%"}
                      onClick={fetchLocation}>
                      Get Current Location
                    </Button>
                    <Select
                      bg={"blackAlpha.500"}
                      color={"black"}
                      mt={"4"}
                      border={"none"}
                      onChange={handleLocationChange}>
                      {" "}
                      <option value="">Choose your location</option>
                      {Cities.map((item, index) => {
                        if (item.city) {
                          return (
                            <option key={index} value={item.city}>
                              {item.city}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </Select>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Button
                bg={"whiteAlpha.800"}
                color={"black"}
                mx={"2"}
                onClick={goToNearMe}>
                Services near me
              </Button>
            </HStack>
          </HStack>
          {token ? (
            <>
              <Menu>
                <MenuButton
                  as={Avatar}
                  colorScheme="orange"
                  src={currentUser.profile}></MenuButton>
                <MenuList>
                  <MenuGroup>
                    <MenuItem
                      style={{ color: "black" }}
                      _hover={{ color: "white" }}>
                      My Cart
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      style={{ color: "black" }}
                      _hover={{ color: "white" }}>
                      Logout
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Button
              onClick={handleLoginClick}
              cursor={"pointer"}
              bg={"whiteAlpha.800"}
              color={"black"}>
              Login | Signup
            </Button>
          )}
        </Flex>
      </Box>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <LogoutConfirmationDialog
        isOpen={isLogoutAlertOpen}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
}
export default LandingPage_Navbar;
