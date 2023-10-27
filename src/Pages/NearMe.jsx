import React, { useEffect, useState } from "react";
import { Heading, Box } from "@chakra-ui/react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NearMe = () => {
  const [servicesNearMe, setServicesNearMe] = useState({});
  const { city } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8088/cities?city=${city}`)
      .then((response) => setServicesNearMe(response.data))
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }, [city]);
  const navigateTo = (name) => {
    navigate(`/${city}/services=${name}`);
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
            gridTemplateColumns: "1fr 1fr 1fr",
            justifyContent: "center",
            alignItems: "center",
            listStyle: "none",
            padding: 0,
          }}>
          {servicesNearMe[0]?.services?.map((service) => (
            <li key={service.id} style={{ padding: "0.5rem" }}>
              {service.sub_services?.map((a, index) => (
                <Box
                  key={index}
                  onClick={() => navigateTo(a.name)}
                  borderWidth="1px"
                  borderRadius="lg"
                  p="3rem"
                  m="1rem"
                  boxShadow="md"
                  _hover={{ boxShadow: "lg" }}>
                  {a.name} near me
                </Box>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NearMe;
