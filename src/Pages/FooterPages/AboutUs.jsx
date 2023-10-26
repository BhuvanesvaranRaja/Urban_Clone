import React, { useEffect } from "react";
import { Heading } from "@chakra-ui/react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Heading className="text-center mt-4">About Us</Heading>
      <div className="text-center fs-5 p-5">
        <h2 className="fw-bolder fs-3">Who are we ?</h2>
        <p className="p-5">
          Urban Company is a technology platform offering a variety of services
          at home. Customers use our platform to book services such as beauty
          treatments, haircuts, massage therapy, cleaning, plumbing, carpentry,
          appliance repair, painting etc. These services are delivered in the
          comfort of their home and at a time of their choosing. We promise our
          customers a high quality, standardised and reliable service
          experience. To fulfill this promise, we work closely with our
          hand-picked service partners, enabling them with technology, training,
          products, tools, financing, insurance and brand, helping them succeed
          and deliver on this promise.{" "}
        </p>
      </div>
      <hr />
      <div className="text-center fs-5 p-5">
        <h2 className="fw-bolder fs-3">How We do it ?</h2>
        <p className="p-5">
          Urban Company provides a platform that allows skilled and experienced
          professionals to connect with users looking for specific services.
          Once on the platform, our match-making algorithm identifies
          professionals who are closest to the users’ requirements and available
          at the requested time and date.
        </p>
      </div>
      <hr />
    </>
  );
};

export default AboutUs;
