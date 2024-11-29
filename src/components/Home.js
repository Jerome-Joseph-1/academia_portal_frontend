// src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
} from 'react-bootstrap';

function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Welcome to the App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* Add navigation links if needed */}
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="text-center">
              <Card.Header as="h5">Select Your Login Portal</Card.Header>
              <Card.Body>
                <Button
                  variant="primary"
                  as={Link}
                  to="/admin-login"
                  className="mb-3 w-100"
                >
                  Admin Login
                </Button>
                <Button
                  variant="secondary"
                  as={Link}
                  to="/hr-login"
                  className="w-100"
                >
                  HR Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
