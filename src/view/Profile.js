import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";

function EditProfile() {
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    organization: "",
    location: "",
    email: "",
    phone: "",
    birthday: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data from API
  useEffect(() => {
    axios
      .get("http://localhost:9999/users/1")
      .then((response) => {
        setUserData(response.data); // Set user data
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Save changes to API
  const handleSave = () => {
    axios
      .put("http://localhost:9999/users/1", userData)
      .then((response) => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="px-4 mt-4">
      <Row>
        {/* Profile Picture */}
        <Col xl={4}>
          <Card className="mb-4">
            <Card.Header>Profile Picture</Card.Header>
            <Card.Body className="text-center">
              <img
                className="img-account-profile rounded-circle mb-2"
                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                alt="User"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <div className="small text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              <Button variant="primary" type="button">
                Upload new image
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Account Details */}
        <Col xl={8}>
          <Card className="mb-4">
            <Card.Header>Account Details</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    value={userData.username}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row className="gx-3 mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        id="email"
                        value={userData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Join Date</Form.Label>
                      <Form.Control
                        type="text"
                        id="birthday"
                        disabled
                        value={userData.joinDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;
