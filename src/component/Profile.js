import React, { useState } from "react";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";

function Profile() {
  // State quản lý thông tin người dùng
  const [user, setUser] = useState({
    name: "Jennifer Carter",
    email: "jennifer.carter@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, City, Country",
    avatar: "https://via.placeholder.com/150",
  });

  // State kiểm soát chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);

  // State lưu thông tin tạm khi chỉnh sửa
  const [tempUser, setTempUser] = useState({ ...user });

  // Xử lý cập nhật thông tin
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  // Lưu thông tin sau khi chỉnh sửa
  const handleSave = () => {
    setUser(tempUser); // Cập nhật thông tin người dùng
    setIsEditing(false); // Thoát chế độ chỉnh sửa
  };

  // Hủy chỉnh sửa
  const handleCancel = () => {
    setTempUser({ ...user }); // Khôi phục dữ liệu ban đầu
    setIsEditing(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <Row className="mb-4">
                <Col md={4} className="text-center">
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="rounded-circle"
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
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={tempUser.name}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={tempUser.email}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={tempUser.phone}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={tempUser.address}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Form>
                  ) : (
                    <>
                      <h4>{user.name}</h4>
                      <p>Email: {user.email}</p>
                      <p>Phone: {user.phone}</p>
                      <p>Address: {user.address}</p>
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
                        onClick={handleSave}
                        className="me-2"
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
