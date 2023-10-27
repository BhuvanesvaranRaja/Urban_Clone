import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { FacebookLoginClient } from "@greatsumini/react-facebook-login";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  login,
  loginGoogle,
  loginFacebook,
} from "../../Redux/Services/authSlice";
import "../../App.css";
import { Icon } from "@chakra-ui/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const appId = "837933008028886";

const Login = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  const [app, setApp] = useState(0);

  useEffect(() => {
    loadFB();
  }, [app]);
  const loadFB = async () => {
    FacebookLoginClient.clear();
    await FacebookLoginClient.loadSdk("en_US");
    FacebookLoginClient.init({ appId: appId, version: "v9.0" });
  };
  const handleLogin = (values) => {
    const { email, password } = values;
    const userData = JSON.parse(localStorage.getItem("signUpData"));
    const user = userData.find(
      (user) => user.email === email && user.password === password
    );
    //NORMAL LOGIN
    if (user) {
      const loggedUser = {
        name: user.name,
        email: user.email,
        contact: user.mobile,
      };
      dispatch(
        login({
          token: user.email,
          loginMethod: "normal",
          user: loggedUser,
        })
      );
      setLoginError(false);
      onClose();
    } else {
      console.log("Login failed");
      setLoginError(true);
    }
  };
  // GOOGLE LOGIN
  const handleGoogleLoginSuccess = (response) => {
    console.log("Google Login successful", response);
    const { name, email, imageUrl } = response.profileObj;
    const loggedUser = {
      name: name,
      contact: "",
      email: email,
      profile: imageUrl,
    };

    dispatch(
      loginGoogle({
        token: response.accessToken,
        loginMethod: "google",
        user: loggedUser,
      })
    );
    onClose();
  };

  const handleGoogleLoginFailure = (response) => {
    console.log("Google Login failed", response);
  };
  // FACEBOOK LOGIN
  const onFacebookLoginSuccess = () => {
    FacebookLoginClient.login(
      (response) => {
        if (response.authResponse) {
          const token = response.authResponse.accessToken;
          //To get profile data
          FacebookLoginClient.getProfile(
            (profileData) => {
              const loggedUser = {
                name: profileData.name,
                email: profileData.email,
                contact: "",
                profile: profileData.picture.data.url,
              };
              dispatch(
                loginFacebook({
                  token: token,
                  loginMethod: "facebook",
                  user: loggedUser,
                })
              );
            },
            { fields: "name,email,picture" }
          );
        } else {
          console.log("Facebook login failed or user denied access.");
        }
      },
      {
        scope: "public_profile,email",
        fields: "name,email,picture",
      }
    );
    onClose();
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="md">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}>
        <Form>
          {loginError && (
            <Text color="red" mb={"3"} textAlign={"center"}>
              Login failed. Please check your credentials.
            </Text>
          )}
          <VStack spacing={4}>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              type="submit"
              colorScheme={"whiteAlpha.800"}
              bg={"blackAlpha.800"}
              width={"100%"}>
              Login
            </Button>
            <Divider />
            <Text>Or login with </Text>
            <Flex justifyContent={"space-evenly"}>
              <GoogleLogin
                clientId="1095168063845-kehnkv6r9kg7nc94id7tpm69sv0lafjf.apps.googleusercontent.com"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={"single_host_origin"}
                autoLoad={false}
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    bg={"#dd4a31"}
                    colorScheme={"#dd4a31"}
                    textColor={"whiteAlpha.800"}
                    mx={2}>
                    <Icon as={FaGoogle} w={6} h={6} mx={2} />
                    Login with Google
                  </Button>
                )}
              />

              <Button
                type="button"
                onClick={onFacebookLoginSuccess}
                bg={"#1b77f2"}
                colorScheme={"#1b77f2"}
                textColor={"whiteAlpha.800"}>
                <Icon as={FaFacebook} w={6} h={6} mx={2} />
                Login with Facebook
              </Button>
            </Flex>
          </VStack>
        </Form>
      </Formik>
    </Box>
  );
};

export default Login;
