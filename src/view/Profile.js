import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EditProfile({ user, onProfileUpdate }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/users")
      .then((resp) => resp.json())
      .then((result) => {
        const matchingUser = result.find((u) => u.id === user.id);
        setUserData(matchingUser);
      })
      .catch((err) => console.error(err));
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    fetch(`http://localhost:9999/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((resp) => resp.json())
      .then((updatedUser) => {
        alert("Profile updated successfully!");

        // Lưu lại user mới vào localStorage
        localStorage.setItem("userId", updatedUser.id);

        // Cập nhật thông tin người dùng trong App.js
        onProfileUpdate(updatedUser);
        navigate("/home");
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  return (
    <Container className="px-4 mt-4">
      <Row>
        {/* Profile Picture */}
        {/* <Col xl={4}>
          {/* <Card className="mb-4">
            <Card.Header>Profile Picture</Card.Header>
            <Card.Body className="text-center">
              {userData && (
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src={userData.profilePicture || "./src/view/image.png"}
                  alt="User"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              )}
            </Card.Body>
          </Card> */}
        {/* </Col> */} 

        {/* Account Details */}
        <Col xl={12}>
          <Card className="mb-4">
            <Card.Header>Account Details</Card.Header>
            <Card.Body>
              {userData ? (
                <Form>
                  {/* Username - Disabled */}
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={userData.username || ""}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={userData.email || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Password (Hidden) */}
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={userData.password || ""}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Join Date */}
                  <Form.Group className="mb-3">
                    <Form.Label>Join Date</Form.Label>
                    <Form.Control
                      type="text"
                      value={userData.joinDate || ""}
                      disabled
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={handleSave}>
                    Save Changes
                  </Button>
                </Form>
              ) : (
                <p>Loading...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;
