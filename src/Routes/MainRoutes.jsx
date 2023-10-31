import React from "react";
import { Route, Routes } from "react-router-dom";

import ReqAuth from "../Components/Service_pages(no)/ReqAuth";
import Blog from "../Pages//FooterPages/Blog";
import Bookings from "../Pages/Bookings";
import Checkout from "../Pages/Checkout";
import Home from "../Pages/Home";
import LandingPage from "../Pages/LandingPage";
import ServicePage from "../Pages/ServicePage";
import Summary from "../Pages/Summary";
import NearMe from "../Pages/NearMe";
import LandingPage_Navbar from "../Components/Navbar/LandingPg_Navbar";
import CommonRoute from "./CommonRoute";
import AboutUs from "../Pages/FooterPages/AboutUs";
import ContactUs from "../Pages/FooterPages/ContactUs";
import TermsAndConditions from "../Pages/FooterPages/TermsAndConditions";
import PrivacyPolicy from "../Pages/FooterPages/PrivacyPolicies";
import CookiesPolicy from "../Pages/FooterPages/CookiesPolicy";
import Law from "../Pages/FooterPages/LawEnforcement";
import Register from "../Pages/FooterPages/Register";
import MyCart from "../Pages/MyCart";

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route element={<CommonRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:city" element={<Home />} />
          <Route path="/:city/services=:service" element={<ServicePage />} />
          <Route path="/:city/near-me" element={<NearMe />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/:city/summary" element={<Summary />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route
            path="/:city/summary/checkout"
            element={
              <ReqAuth>
                <Checkout />
              </ReqAuth>
            }
          />
          <Route path="/aboutus" element={<AboutUs />}></Route>
          <Route path="/blog" element={<Blog />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/tandc" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />{" "}
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/law" element={<Law />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default MainRoutes;
