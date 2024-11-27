import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";

function Profile() {
  const [user, setUser] = useState(null); // State lưu thông tin user
  const [isEditing, setIsEditing] = useState(false); // State kiểm tra chế độ chỉnh sửa
  const [tempUser, setTempUser] = useState(null); // State tạm lưu dữ liệu khi chỉnh sửa

  // Gọi API lấy dữ liệu user khi component được render
  useEffect(() => {
    axios
      .get("http://localhost:9999/users/1") // API lấy thông tin user
      .then((response) => {
        setUser(response.data);
        setTempUser(response.data); // Lưu dữ liệu tạm thời để chỉnh sửa
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  // Xử lý khi thay đổi giá trị trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  // Xử lý lưu dữ liệu sau khi chỉnh sửa
  const handleSave = () => {
    setUser(tempUser); // Cập nhật dữ liệu user
    setIsEditing(false); // Thoát chế độ chỉnh sửa
    // Gửi API PATCH để lưu dữ liệu lên server nếu cần
    axios
      .patch(`http://localhost:9999/users/1`, tempUser)
      .then(() => console.log("User updated successfully"))
      .catch((error) => console.error("Error updating user:", error));
  };

  // Hủy chỉnh sửa, phục hồi dữ liệu ban đầu
  const handleCancel = () => {
    setTempUser(user); // Khôi phục dữ liệu gốc
    setIsEditing(false);
  };

  // Loading state nếu dữ liệu chưa sẵn sàng
  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <Row className="mb-4">
                <Col md={4} className="text-center">
                  <img
                    src={
                      user.profilePicture || "https://via.placeholder.com/150"
                    }
                    alt="User Avatar"
                    className="rounded-circle img-fluid"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col md={8}>
                  {isEditing ? (
                    <Form>
                      <h2>Edit Profile</h2>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={tempUser.username}
                          onChange={handleInputChange}
                          placeholder="Enter full name"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={tempUser.email}
                          onChange={handleInputChange}
                          placeholder="Enter email"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Join Date</Form.Label>
                        <Form.Control
                          type="email"
                          name="joinDate"
                          disabled
                          value={tempUser.joinDate}
                          onChange={handleInputChange}
                          placeholder="Enter joinDate"
                        />
                      </Form.Group>
                    </Form>
                  ) : (
                    <>
                      <h2>Profile</h2>
                      <p>
                        <strong>Fullname: </strong>
                        {user.username}
                      </p>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Join Date:</strong> {user.joinDate}
                      </p>
                    </>
                  )}
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  {isEditing ? (
                    <>
                      <Button
                        variant="success"
                        className="me-2"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button variant="danger" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
