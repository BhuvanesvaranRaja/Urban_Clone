import React from "react";
import { Outlet } from "react-router-dom";
import LandingPg_Navbar from "../Components/Navbar/LandingPg_Navbar";
import Footer from "../Components/Footer/Footer";

const CommonRoute = () => {
  return (
    <>
      <LandingPg_Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default CommonRoute;
