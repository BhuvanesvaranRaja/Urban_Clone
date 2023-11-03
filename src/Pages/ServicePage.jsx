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
import AddressFetchModal from "../Components/Service_Page/AddressFetchModal";
const ServicePage = () => {
  const { city, service } = useParams();
  const [serviceCenters, setServiceCenters] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [displayNewComponent, setDisplayNewComponent] = useState(false);
  const dispatch = useDispatch();
  // const currentAddress = useSelector((state) => state.location.address);
  // useEffect(() => {
  //   if (currentAddress === null) {
  //     openModal();
  //   } else {
  //     return null;
  //   }
  // }, [currentAddress]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
                        selectedService={selectedService}
                        index={id}
                      />
                    </Col>
                  </>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Row>
          {/* <AddressFetchModal isOpen={isModalOpen} onClose={closeModal} /> */}
        </Container>
      </>
    </>
  );
};

export default ServicePage;
