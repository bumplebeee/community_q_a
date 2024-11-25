import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle forgot password logic here
    alert(`Password reset link sent to: ${email}`);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="text-center">Forgot Password</h3>
      <p className="text-center text-muted">
        Enter your email address below and we will send you a link to reset your
        password.
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="forgotPasswordEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-3">
          Send Reset Link
        </Button>
      </Form>
      <Button
        variant="secondary"
        className="w-100"
        onClick={() => navigate("/")}
      >
        Back to Login
      </Button>
    </Container>
  );
}

export default ForgotPassword;
