import React, { useEffect, useRef, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Split from "../Components/Service_pages(no)/Split";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/Services/action";
import { Badge, Container, Button } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "../Components/Service_Page/Map";
import ListView from "../Components/Service_Page/ListView";
const ServicePage = () => {
  const { service } = useParams();
  const city = useSelector((state) => state.location.location);
  const [serviceCenters, setServiceCenters] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [displayNewComponent, setDisplayNewComponent] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/service_centers?city=${city}`
        );
        if (response.data?.length > 0) {
          setServiceCenters(response.data);
          setSelectedService(response.data[0]);
        } else {
          // Data is not available
          setServiceCenters("");
          console.log(`No service centers found for city: ${city}`);
        }
        dispatch(getAllProducts(city, service));
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    fetchData();
  }, [dispatch, city, service]);

  const toggleClick = () => {
    setDisplayNewComponent(!displayNewComponent);
  };
  return (
    <>
      <>
        <Container className="m-2">
          <Row>
            <div className="d-flex justify-content-between mb-3 align-items-center ">
              <h3
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                  fontWeight: "bolder",
                  letterSpacing: "3px",
                  marginLeft: "50px",
                  marginTop: "0px",
                }}>
                AVAILABLE LOCATIONS
              </h3>
            </div>
            <Tabs
              isFitted
              variant="enclosed"
              marginLeft={"50px"}
              size={"lg"}
              marginTop={"20px"}>
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
                <TabPanel px={0}>
                  <ListView centers={serviceCenters} service={service} />
                </TabPanel>
                <TabPanel>
                  <>
                    <Col xs={12} sm={6} md={12}>
                      <Map
                        centers={serviceCenters}
                        service={service}
                        // selectedService={selectedService}
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
