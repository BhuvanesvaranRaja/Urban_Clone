import React from "react";
import { Route, Routes } from "react-router-dom";
import ReqAuth from "../Components/Service_pages(no)/ReqAuth";
import Blog from "../Pages//FooterPages/Blog";
import Home from "../Pages/Home";
import LandingPage from "../Pages/LandingPage";
import ServicePage from "../Pages/ServicePage";
import NearMe from "../Pages/NearMe";
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
          <Route path="/home" element={<Home />} />
          <Route path="/services=:service" element={<ServicePage />} />
          <Route path="/near-me" element={<NearMe />} />
          <Route path="/aboutus" element={<AboutUs />}></Route>
          <Route path="/mycart" element={<MyCart />} />
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
