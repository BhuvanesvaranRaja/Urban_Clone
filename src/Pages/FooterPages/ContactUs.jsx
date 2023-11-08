import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const locations = [
  {
    name: "Location 1",
    address: "123 Main Street, City, Country",
    phone: "+1 (123) 456-7890",
  },
  {
    name: "Location 2",
    address: "456 Elm Street, City, Country",
    phone: "+1 (234) 567-8901",
  },
  {
    name: "Location 3",
    address: "789 Oak Street, City, Country",
    phone: "+1 (345) 678-9012",
  },
  {
    name: "Location 4",
    address: "567 Pine Street, City, Country",
    phone: "+1 (456) 789-0123",
  },
  {
    name: "Location 5",
    address: "890 Cedar Street, City, Country",
    phone: "+1 (567) 890-1234",
  },
  {
    name: "Location 6",
    address: "234 Birch Street, City, Country",
    phone: "+1 (678) 901-2345",
  },
  {
    name: "Location 7",
    address: "345 Maple Street, City, Country",
    phone: "+1 (789) 012-3456",
  },
  {
    name: "Location 8",
    address: "678 Willow Street, City, Country",
    phone: "+1 (890) 123-4567",
  },
  {
    name: "Location 9",
    address: "456 Redwood Street, City, Country",
    phone: "+1 (012) 345-6789",
  },
  {
    name: "Location 10",
    address: "123 Oakwood Street, City, Country",
    phone: "+1 (234) 567-8901",
  },
  {
    name: "Location 11",
    address: "789 Cedarwood Street, City, Country",
    phone: "+1 (345) 678-9012",
  },
  {
    name: "Location 12",
    address: "567 Pineview Street, City, Country",
    phone: "+1 (456) 789-0123",
  },
];

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <h1 className="fs-1 text-center fw-bold mt-5 mb-3 p-3">Contact Us</h1>
      <hr />
      <Container className="mt-4 p-5">
        <Row>
          {locations.map((location, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{location.name}</Card.Title>
                  <Card.Text>{location.address}</Card.Text>
                  <Card.Text>Phone: {location.phone}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ContactUs;
