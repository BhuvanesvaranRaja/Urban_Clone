import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  mobile: Yup.string().required("Mobile number is required"),
});
const SignUp = () => {
  const handleSignUp = (values, { resetForm }) => {
    const existingData = JSON.parse(localStorage.getItem("signUpData")) || [];
    existingData.push(values);
    localStorage.setItem("signUpData", JSON.stringify(existingData));
    console.log("Signup form values:", values);
    resetForm();
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <Formik
        initialValues={{ name: "", email: "", password: "", mobile: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}>
        <Form>
          <VStack spacing={4}>
            <Field name="name">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
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
            <Field name="mobile">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.mobile && form.touched.mobile}>
                  <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
                  <Input
                    {...field}
                    id="mobile"
                    type="text"
                    placeholder="Enter your mobile number"
                  />
                  <FormErrorMessage>{form.errors.mobile}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              type="submit"
              colorScheme={"whiteAlpha.800"}
              bg={"blackAlpha.800"}
              width={"100%"}>
              Sign up
            </Button>
          </VStack>
        </Form>
      </Formik>
    </Box>
  );
};

export default SignUp;
