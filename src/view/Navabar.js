import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarComponent() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Comunity QA</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                    Home
                </Nav.Link>
                <Nav.Link as={Link} to="/questions">
                    Questions
                </Nav.Link>
                <Nav.Link as={Link} to="/tags">
                    Tags
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                    Users
                </Nav.Link>
            </Nav>
            <Button variant="outline-light" className="ms-2">
                Login
            </Button>
            <Button variant="outline-light" className="ms-2">
                Sign Up
            </Button>
        </Navbar>
    );
}

export default NavbarComponent;
