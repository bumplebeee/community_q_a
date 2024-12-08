import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Users({ users }) {
    return (
        <Container>
            <h2 className="mb-4">Top Users</h2>
            <Row>
                {users.map((user) => (
                    <Col md={4} className="mb-4" key={user.id}>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={
                                    user.profilePicture ||
                                    "https://example.com/default-profile.jpg"
                                }
                                alt={`${user.username}`}
                            />
                            <Card.Body>
                                <Card.Title>{user.username}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {user.email}
                                    <br />
                                    <strong>Join Date:</strong> {user.joinDate}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Users;
