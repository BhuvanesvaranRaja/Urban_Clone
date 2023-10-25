import React from "react";
import { Route, Routes } from "react-router-dom";

import ReqAuth from "../Components/ReqAuth";
import Blog from "../Pages/Blog";
import Bookings from "../Pages/Bookings";
import Checkout from "../Pages/Checkout";
import Home from "../Pages/Home";
import LandingPage from "../Pages/LandingPage";
import ServicePage from "../Pages/ServicePage";
import Summary from "../Pages/Summary";
import NearMe from "../Pages/NearMe";
import LandingPage_Navbar from "../Components/LandingPg_Navbar";
import CommonRoute from "./CommonRoute";

const MainRoutes = () => {
  return (
    <div>
      {/* <LandingPage_Navbar /> */}
      <Routes>
        <Route element={<CommonRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:city" element={<Home />} />
          <Route path="/:city/services=:service" element={<ServicePage />} />
          <Route path="/:city/near-me" element={<NearMe />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/:city/summary" element={<Summary />} />
          <Route
            path="/:city/summary/checkout"
            element={
              <ReqAuth>
                <Checkout />
              </ReqAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default MainRoutes;
