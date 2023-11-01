import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

const OtherServices = ({ centers, service, handleOpenModal }) => {
  const [otherServices, setOtherServices] = useState([]);

  useEffect(() => {
    if (centers && service) {
      const allServices = centers[0]?.service_categories;
      if (allServices) {
        const { [service]: _, ...otherServices } = allServices;
        setOtherServices(otherServices);
      }
    }
  }, [centers, service]);
  return (
    <>
      <Row>
        <Col>
          {Object.keys(otherServices).map((category, categoryIndex) => (
            <Card
              style={{
                width: "35rem",
                margin: "auto",
                marginBottom: "20px",
                borderRadius: "10px",
              }}
              key={categoryIndex}>
              <Card.Body>
                <Card.Title className="text-center text-danger fw-bolder mb-3">
                  Similar {category} Services
                </Card.Title>
                <Row>
                  {otherServices[category].map((center, index) => (
                    <Col key={index}>
                      <Card
                        style={{
                          width: "23rem",
                          margin: "auto",
                          marginBottom: "30px",
                        }}>
                        <Card.Img variant="top" src={center.image} />
                        <Card.Body>
                          <Card.Title
                            style={{
                              fontSize: "20px",
                              fontWeight: "bold",
                            }}>
                            {center.name}
                          </Card.Title>
                          <Card.Text>Address: {center.address}</Card.Text>
                          <Card.Text>Phone: {center.phone}</Card.Text>
                          <Button
                            colorScheme="green"
                            size={"xs"}
                            mt="4"
                            p="2"
                            onClick={() => handleOpenModal(center)}>
                            VIEW DETAILS
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default OtherServices;
