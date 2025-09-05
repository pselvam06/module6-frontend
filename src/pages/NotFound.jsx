import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: "70vh" }}>
      <Row>
        <Col className="text-center">
          <h1 className="display-3 fw-bold">404</h1>
          <h2 className="mb-3">Page Not Found</h2>
          <p className="text-muted mb-4">
            The page you are looking for doesn’t exist or has been moved.
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Go Back Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
