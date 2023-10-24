import React, { useEffect, useRef, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Split from "../Components/Service_pages/Split";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getAllServiceCenters } from "../Redux/Services/action";
import {
  Box,
  Image,
  Heading,
  TagLabel,
  Badge,
  Container,
  Button,
} from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ServiceCenterModal from "../Components/Modal/ServiceCenterModal";
import Map from "./Map";
import ListView from "./ListView.jsx";
import LandingPage_Navbar from "../Components/LandingPg_Navbar";

const ServicePage = () => {
  const { city, service } = useParams();
  const [serviceCenters, setServiceCenters] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [id, setId] = useState(null);
  const [displayNewComponent, setDisplayNewComponent] = useState(false);

  const dispatch = useDispatch();
  const allProduct = useSelector((store) => store?.allProduct);
  const distancesAndDurations = useSelector(
    (state) => state.distancesDurations
  );
  useEffect(() => {
    axios
      .get(`http://localhost:8088/service_centers?city=${city}`)
      .then((response) => {
        setServiceCenters(response.data);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
    dispatch(getAllProducts(city, service));
  }, [dispatch, city, service]);

  const subServices = allProduct.data[0]?.services
    .map((service) => service.sub_services)
    .flat();

  const handleCardClick = (service, index) => {
    setSelectedService(service);
    setId(index);
  };
  const toggleClick = () => {
    setDisplayNewComponent(!displayNewComponent);
  };
  return (
    <>
      <LandingPage_Navbar />
      <>
        <Container className="m-2">
          <Row className="mt-3">
            <div className="d-flex justify-content-between mb-3 align-items-center ">
              <h3
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                  fontWeight: "bolder",
                  letterSpacing: "3px",
                }}>
                AVAILABLE LOCATIONS
              </h3>
            </div>
            <Tabs isFitted variant="enclosed">
              <TabList>
                <Tab
                  onClick={toggleClick}
                  _selected={{ color: "white", bg: "blackAlpha.800" }}>
                  List View
                </Tab>
                <Tab
                  onClick={toggleClick}
                  _selected={{ color: "white", bg: "blackAlpha.800" }}>
                  Map View
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ListView centers={serviceCenters} service={service} />
                </TabPanel>
                <TabPanel>
                  <>
                    <Col
                      xs={12}
                      sm={6}
                      md={3}
                      style={{
                        overflowY: "auto",
                        maxHeight: "80vh",
                        width: "100%",
                      }}>
                      <ul
                        style={{
                          listStyleType: "none",
                          paddingLeft: 0,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}>
                        {serviceCenters[0]?.service_categories[service]?.map(
                          (item, index) => (
                            <li key={index}>
                              <Card
                                style={{ width: "18rem" }}
                                className="mb-4"
                                onClick={() => handleCardClick(item, index)}>
                                <Card.Img variant="top" src={item.image} />
                                <Card.Body>
                                  <Card.Title className="fs-4 mb-2">
                                    {item.name}
                                  </Card.Title>
                                  <Card.Text>{item.description}</Card.Text>
                                  <Card.Text>{item.address}</Card.Text>
                                  <Badge color={"red"}>{item.phone}</Badge>
                                  <br />
                                  <Badge color={"blue"}>
                                    Distance:{" "}
                                    {distancesAndDurations[index]?.distance}
                                  </Badge>
                                  <br />
                                  <Badge color={"blue"}>
                                    Time Estimation :{" "}
                                    {distancesAndDurations[index]?.duration}
                                  </Badge>
                                </Card.Body>
                              </Card>
                            </li>
                          )
                        )}
                      </ul>
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      md={9}
                      style={{
                        position: "fixed",
                        right: 0,
                        top: "10",
                        bottom: 0,
                        left: "25%",
                      }}>
                      <Map
                        centers={serviceCenters}
                        service={service}
                        selectedService={selectedService}
                        index={id}
                      />
                    </Col>
                  </>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Row>
        </Container>
      </>
    </>
  );
};

export default ServicePage;
