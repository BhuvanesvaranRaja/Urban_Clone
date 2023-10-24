import React, { useState } from "react";
import GoogleLogin from "react-google-login";
// import { LoginSocialFacebook } from "reactjs-social-login";
import FacebookLogin from "react-facebook-login";

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
} from "../../Redux/Services/AuthSlice";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
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
        contactNumber: user.mobile,
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
    const det = localStorage.getItem("userDetails");
    console.log("abcdef", det);
  };

  const handleGoogleLoginFailure = (response) => {
    console.log("Google Login failed", response);
  };
  // FACEBOOK LOGIN

  const handleFacebookLoginResponse = (response) => {
    console.log("status", response.status);
    const loggedUser = {
      name: response.name,
      email: response.email,
      contactNumber: "",
      profile: response.picture.data.url,
    };
    dispatch(
      loginFacebook({
        token: response.accessToken,
        loginMethod: "facebook",
        user: loggedUser,
      })
    );
    console.log("Facebook login :", response);
    onClose();
  };

  const handleFacebookLoginFailure = (error) => {
    console.error("Facebook login error:", error);
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
              bg={"black"}
              width={"100%"}>
              Login
            </Button>
            <Divider />
            <Text>Or login with </Text>
            <Flex justifyContent={"space-evenly"}>
              <GoogleLogin
                clientId="1095168063845-kehnkv6r9kg7nc94id7tpm69sv0lafjf.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy={"single_host_origin"}
                autoLoad={false}
              />
              <FacebookLogin
                appId="837933008028886"
                autoLoad={false}
                fields="name,email,picture"
                callback={handleFacebookLoginResponse}
                onFailure={handleFacebookLoginFailure}
                textButton="Login with Facebook"
              />
            </Flex>
          </VStack>
        </Form>
      </Formik>
    </Box>
  );
};

export default Login;
