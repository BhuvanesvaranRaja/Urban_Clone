import React from "react";
import { useToast } from "@chakra-ui/react";

const ToastMessage = () => {
  const toast = useToast();

  const showToast = () => {
    toast({
      description: "You have successfully logged in.",
      status: "success",
      duration: 900,
      position: "top-right",
      containerStyle: {
        marginTop: "80px",
      },
    });
  };

  React.useEffect(() => {
    showToast();
  }, []);

  return null;
};

export default ToastMessage;
