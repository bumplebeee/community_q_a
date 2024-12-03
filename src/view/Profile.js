import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function EditProfile({ user, onProfileUpdate }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState("");

  const handleSaveChanges = () => {
    const updatedProfile = { username, email, joinDate: user.joinDate };
    onProfileUpdate(updatedProfile); // Pass updated profile to parent component
    alert("Profile updated successfully!");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); // Preview the image
    }
  };

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
                src={
                  profilePic ||
                  "http://bootdey.com/img/Content/avatar/avatar1.png"
                }
                alt="User"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <div className="small text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="mb-2"
              />
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Join Date</Form.Label>
                  <Form.Control type="text" value={user.joinDate} disabled />
                </Form.Group>

                <Button variant="primary" onClick={handleSaveChanges}>
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
