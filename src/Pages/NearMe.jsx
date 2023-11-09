import React, { useEffect, useState } from "react";
import { Heading, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getService } from "../Api/getServices";

const NearMe = () => {
  const [servicesNearMe, setServicesNearMe] = useState({});
  const city = useSelector((state) => state.location.location);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    getService
      .get(`/cities?city=${city}`)
      .then((response) => setServicesNearMe(response.data))
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }, [city]);

  const navigateTo = (name) => {
    navigate(`/services=${name}`);
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "100px",
        }}>
        <Heading>Services near me</Heading>
        <p style={{ fontSize: "1.25rem", marginTop: "1rem", padding: "1rem" }}>
          Find all Urban Company Local Services near you. Choose from 25,000 +
          trained professionals to take care of all your needs - Beauty
          Services, Home Services, Appliance Electronic Repairs and much more.
        </p>
        <hr style={{ margin: "0 auto", width: "80%" }} />
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            listStyle: "none",
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "1200px",
          }}>
          {servicesNearMe[0]?.services?.map((service) =>
            service.sub_services?.map((a, index) => (
              <li key={index} style={{ padding: "1.5rem" }}>
                <Box
                  onClick={() => navigateTo(a.name)}
                  borderWidth="1px"
                  borderRadius="lg"
                  p="2rem"
                  m="1rem"
                  boxShadow="md"
                  _hover={{ boxShadow: "lg" }}>
                  {a.name} near me
                </Box>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default NearMe;
