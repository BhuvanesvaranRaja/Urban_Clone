import {
  Box,
  Flex,
  HStack,
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
  useToast,
  Popover,
  useDisclosure,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { address, locationMethod } from "../../Redux/Services/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogout } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Services/authSlice";
import { FacebookLoginClient } from "@greatsumini/react-facebook-login";
import LoginModal from "../Modal/LoginModal";
import LogoutConfirmationDialog from "../Modal/LogoutConfirmationDialog";
import { getCityFromGeolocation } from "../../Utils/CityLocation";
import { GoLocation } from "react-icons/go";
import { Cities } from "..//../assets/Cities";
import LocationDrawer from "../homepage/LocationDrawer";
import AddressFetchModal from "../Service_Page/AddressFetchModal";
import { useLocation } from "react-router-dom";
import { location } from "../../Redux/Services/locationSlice";
import { getCityName } from "../../Utils/getCityInfo";

function LandingPage_Navbar() {
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart);
  const loginMethod = useSelector((state) => state.auth.loginMethod);
  const currentUser = JSON.parse(localStorage.getItem("userDetails"));
  const city = useSelector((state) => state.location.location);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toast = useToast();
  const locationPath = useLocation();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isAddressFetchModalOpen, setIsAddressFetchModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const cartItemCount = cartItems.length;

  useEffect(() => {
    if (locationPath.pathname === "/") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [locationPath]);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };
  const handleLocationChange = (event) => {
    const city = event.target.value;
    // Navigate to the selected location
    if (city) {
      dispatch(location({ city }));
      dispatch(locationMethod("city"));
      navigate(`home`);
      setIsPopoverOpen(false);
      event.target.value = "";
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
    clientId: process.env.REACT_APP_GOOGLE_LOGIN_CLIENTID,
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
      dispatch(location({ city }));
      dispatch(locationMethod("current"));
      navigate(`/near-me`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchLocation = async () => {
    try {
      if (pathname === "/") {
        const Currentcity = await getCityFromGeolocation();
        console.log("curent", Currentcity);
        dispatch(location({ city: Currentcity }));
        dispatch(locationMethod("current"));
        navigate("/home");
      } else {
        const Currentcity = await getCityFromGeolocation();
        const currentURL = window.location.href;
        const newURL = currentURL.replace(`${city}`, `${Currentcity}`);
        dispatch(location({ city: Currentcity }));
        dispatch(locationMethod("current"));
        window.location.href = newURL;
      }
    } catch (error) {
      console.error("Error fetching the location ", error);
    }
  };
  //Drawer setType
  const handleSetType = async (type) => {
    if (type === "map") {
      setIsAddressFetchModalOpen(true);
    } else if (type === "current") {
      handleGetCurrentLocation();
    } else {
      console.log("error");
    }
  };
  const openAddressFetchModal = () => {
    setIsDrawerOpen(true);
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
        const cityName = await getCityName(currentLat, currentLng);
        dispatch(address({ lat: currentLat, lng: currentLng }));
        dispatch(location({ city: cityName }));
        dispatch(locationMethod("current"));
        setIsDrawerOpen(false);
        toast({
          title: "Your current Location is set as address",
          status: "success",
          duration: 800,
          isClosable: true,
          position: "top-right",
          containerStyle: {
            marginTop: "80px",
          },
        });
      }
    } catch (error) {
      console.error("Error getting current location:", error);
      toast({
        title: "Geolocation is not supported by your browser",
        status: "danger",
        duration: 800,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Box
        bg={"blackAlpha.900"}
        color={"whiteAlpha.900"}
        px={3}
        w={"100%"}
        position="fixed"
        top={0}
        zIndex={1}>
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
              <Popover
                isOpen={isPopoverOpen}
                onClose={() => setIsPopoverOpen(false)}>
                <PopoverTrigger>
                  <Button
                    bg={"whiteAlpha.800"}
                    color={"black"}
                    p={"5"}
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                    <span className="mx-2">
                      {pathname === "/" ? "Select a location" : city}
                    </span>
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
                      color={"black"}
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
                // mx={"2"}
                onClick={goToNearMe}>
                Services near me
              </Button>
              {/* NOTIFICATION */}
              <Popover>
                <PopoverTrigger>
                  <Button bg={"whiteAlpha.800"} color={"black"}>
                    <FaBell />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader bg="blackAlpha.700">
                    Notification
                  </PopoverHeader>
                  <PopoverBody bg="orange.400">
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li>
                        <Box p={2} borderBottom="1px solid #ccc">
                          <Text fontWeight="bold">New Item Added</Text>
                          <Text fontSize="sm">
                            You have added a new item to your cart.
                          </Text>{" "}
                          <Text fontSize="sm" color="gray.500">
                            2 minutes ago
                          </Text>
                        </Box>
                      </li>
                      <li>
                        <Box p={2} borderBottom="1px solid #ccc">
                          <Text fontWeight="bold">Discount Available</Text>

                          <Text fontSize="sm">
                            Don't miss out on our special discount offer.
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            10 minutes ago
                          </Text>
                        </Box>
                      </li>
                      <li>
                        <Box p={2}>
                          <Text fontWeight="bold">Order Shipped</Text>
                          <Text fontSize="sm">
                            Your order has been shipped and will arrive soon.
                          </Text>{" "}
                          <Text fontSize="sm" color="gray.500">
                            1 hour ago
                          </Text>
                        </Box>
                      </li>
                    </ul>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              {cartItemCount >= 1 ? (
                <Link to={"/mycart"}>
                  <Button bg={"whiteAlpha.800"} color={"black"}>
                    <FaShoppingCart />
                    {cartItemCount > 0 && (
                      <Text
                        bg="red.500"
                        color="white"
                        borderRadius="full"
                        fontSize="sm"
                        fontWeight="bold"
                        position="absolute"
                        top="-5px"
                        right="-5px"
                        w={6}
                        h={6}
                        textAlign="center"
                        lineHeight="6">
                        {cartItemCount}
                      </Text>
                    )}
                  </Button>
                </Link>
              ) : (
                <Popover trigger="click" placement="bottom-start">
                  <PopoverTrigger>
                    <Button bg={"whiteAlpha.800"} color={"black"}>
                      <FaShoppingCart />
                      {cartItemCount > 0 && (
                        <Text
                          bg="red.500"
                          color="white"
                          borderRadius="full"
                          fontSize="sm"
                          fontWeight="bold"
                          position="absolute"
                          top="-5px"
                          right="-5px"
                          w={6}
                          h={6}
                          textAlign="center"
                          lineHeight="6">
                          {cartItemCount}
                        </Text>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent mt="2">
                    <PopoverArrow />
                    <PopoverBody color="black" p="4" bg="blackAlpha.300">
                      <div>
                        Your cart is currently empty. Add items to your cart.
                      </div>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )}
            </HStack>
          </HStack>
          {token ? (
            <>
              <Menu>
                <MenuButton as={Avatar} src={currentUser.profile}></MenuButton>
                <MenuList>
                  <MenuGroup>
                    <MenuItem
                      onClick={openAddressFetchModal}
                      isDisabled={disabled}
                      style={{ color: "black" }}
                      _hover={{ color: "white" }}>
                      Edit Address
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
              mx={"2"}
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
      />{" "}
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
    </>
  );
}
export default LandingPage_Navbar;
