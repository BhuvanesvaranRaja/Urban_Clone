import {
  Box,
  Flex,
  HStack,
  useDisclosure,
  Image,
  Button,
  Text,
  Avatar,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Menu,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogout } from "react-google-login";
import { Link, useParams } from "react-router-dom";
import { logout } from "../Redux/Services/AuthSlice";
import { FacebookLoginClient } from "@greatsumini/react-facebook-login";
import LoginModal from "../Components/Service_pages/modal/LoginModal";
import LogoutConfirmationDialog from "./Service_pages/modal/LogoutConfirmationDialog";

function LandingPage_Navbar() {
  const token = useSelector((state) => state.auth.token);
  const loginMethod = useSelector((state) => state.auth.loginMethod);
  const currentUser = JSON.parse(localStorage.getItem("userDetails"));
  const dispatch = useDispatch();
  const { city } = useParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);

  // console.log("login by", loginMethod);
  const Links = [
    { title: "Blog", link: "/blog" },
    {
      title: "Services Near Me",
      link: `/${city}/near-me`,
    },
  ];
  console.log(city);
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    setIsLogoutAlertOpen(true);
  };

  const confirmLogout = () => {
    // loginMethod === "normal" ? dispatch(logout()) : signOut();
    // setIsLogoutAlertOpen(false);
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
              <Image
                src="https://res.cloudinary.com/urbanclap/image/upload/images/growth/home-screen/1631097450980-d2de38.png"
                width={"30%"}
              />
            </Flex>
            <HStack as={"nav"} display={{ base: "none", md: "flex" }}>
              {Links.map((link, index) => (
                <Link to={link.link} key={index} className="mx-3">
                  {link.title}
                </Link>
              ))}
            </HStack>
          </HStack>
          {token ? (
            <>
              {/* <Button
                onClick={handleLogout}
                bg={"whiteAlpha.800"}
                color={"black"}>
                Logout
              </Button> */}
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
                      My Account
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
