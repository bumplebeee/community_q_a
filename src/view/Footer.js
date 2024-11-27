import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
    return (
        <footer
            style={{
                backgroundColor: "#343a40",
                color: "#fff",
                padding: "20px 0",
            }}
        >
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About Us</h5>
                        <p>Day la web de moi nguoi thao luan ve viec mua ban</p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            <li>
                                <a
                                    href="/"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/questions"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                >
                                    Questions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/tags"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                >
                                    Tags
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/users"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                >
                                    Users
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <p>Email: beakvietthinh@gmail.com</p>
                        <p>Phone: +123 456 789</p>
                    </Col>
                </Row>
                <hr style={{ borderColor: "#777" }} />
                <p className="text-center mb-0">
                    &copy; 2024 Community QA. All rights reserved.
                </p>
            </Container>
        </footer>
    );
}

export default Footer;
