import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarComponent() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            alert(`Searching for: ${searchQuery}`);
            setSearchQuery("");
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">
                Community QA
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/home">
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

            <Form className="d-flex me-2" onSubmit={handleSearch}>
                <FormControl
                    type="search"
                    placeholder="Search questions..."
                    className="me-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="outline-light">
                    Search
                </Button>
            </Form>

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