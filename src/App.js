import React from "react";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import QuestionList from "./components/HomePage";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <Container fluid>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="/">Comunity QA</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#questions">Questions</Nav.Link>
                        <Nav.Link href="#tags">Tags</Nav.Link>
                        <Nav.Link href="#users">Users</Nav.Link>
                    </Nav>
                    <Button variant="outline-light" className="ms-2">
                        Login
                    </Button>
                    <Button variant="outline-light" className="ms-2">
                        Sign Up
                    </Button>
                </Container>
            </Navbar>

            <Container>
                <Row>
                    {/* Main Content */}
                    <Col md={8}>
                        <h2 className="mb-4">Top Questions</h2>
                        <QuestionList />
                    </Col>

                    {/* Sidebar */}
                    <Col md={4}>
                        <Sidebar />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default App;
