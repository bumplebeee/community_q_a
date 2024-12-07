// src/view/MyPost.js
import React from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";

function MyPost({ user, questions }) {
  // Kiểm tra nếu questions là mảng hợp lệ
  if (!Array.isArray(questions)) {
    return <p>No questions available</p>; // Hoặc có thể xử lý theo cách khác
  }

  // Lọc câu hỏi của người dùng đã đăng nhập
  const userQuestions = questions.filter(
    (question) => question.userId === user.id
  );

  return (
    <div>
      <h2>Your Questions</h2>
      {userQuestions.length === 0 ? (
        <p>You haven't posted any questions yet.</p>
      ) : (
        userQuestions.map((question) => (
          <Card key={question.id} className="mb-3">
            <Card.Body>
              <Row>
                <Col md={2} className="text-center">
                  <p>
                    <strong>{question.votes}</strong> votes
                  </p>
                  <p>
                    <strong>{question.views}</strong> views
                  </p>
                </Col>
                <Col md={10}>
                  <Card.Title>{question.title}</Card.Title>
                  <Card.Text>{question.content}</Card.Text>
                  <div>
                    {question.tags.map((tag, index) => (
                      <Badge bg="secondary" key={index} className="me-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="link" className="p-0 mt-2">
                    View Details
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default MyPost;
