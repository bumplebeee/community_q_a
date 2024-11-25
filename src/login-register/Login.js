import React, { useState } from "react";
import { Container, Nav, Tab, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../login-register/Login.css";
function Login() {
  const [activeKey, setActiveKey] = useState("login");

  return (
    <Container className="body mt-5" style={{ maxWidth: "600px" }}>
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Nav variant="pills" className="justify-content-center mb-3">
          <Nav.Item>
            <Nav.Link eventKey="login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="register">Register</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="login">
            <h3 className="text-center">Sign in</h3>

            <Form>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Row className="mb-3">
                <Col>
                  <Form.Check type="checkbox" label="Remember me" />
                </Col>
                <Col className="text-end">
                  <Link to="/forgot-password">Forgot password?</Link>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className="w-100">
                Sign in
              </Button>
            </Form>
          </Tab.Pane>

          <Tab.Pane eventKey="register">
            <h3 className="text-center">Sign up</h3>

            <Form>
              <Form.Group className="mb-3" controlId="registerName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerTerms">
                <Form.Check
                  type="checkbox"
                  label="I have read and agree to the terms"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Sign up
              </Button>
            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default Login;
