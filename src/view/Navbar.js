import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarComponent({ user, onLogout }) {
  const handleLogout = () => {
    onLogout(); // Call onLogout from App.js to log out
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
        <Nav.Link as={Link} to="/add-post">
          Add Post
        </Nav.Link>
      </Nav>

      {/* Display user info or Login/Sign Up buttons */}
      {user ? (
        <>
          <span className="text-white me-2">Hello, {user}</span>
          <Button
            variant="outline-light"
            className="me-2"
            as={Link}
            to="/edit-profile"
          >
            Profile
          </Button>
          <Button variant="outline-light" onClick={handleLogout}>
            LogOut
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline-light"
            className="ms-2"
            as={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="outline-light"
            className="ms-2"
            as={Link}
            to="/sign-up"
          >
            Sign Up
          </Button>
        </>
      )}
    </Navbar>
  );
}

export default NavbarComponent;
