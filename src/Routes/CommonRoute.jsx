import React from "react";
import { Outlet } from "react-router-dom";
import LandingPg_Navbar from "../Components/LandingPg_Navbar";

const CommonRoute = () => {
  return (
    <>
      <LandingPg_Navbar />
      <Outlet />
    </>
  );
};

export default CommonRoute;
