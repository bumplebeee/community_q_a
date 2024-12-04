import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";

function QuestionList({ questions = [], user }) {
  const [answers, setAnswers] = useState({});
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState({});
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const questionsPerPage = 2;

  useEffect(() => {
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => {
        const answerMap = {};
        data.answers.forEach((answer) => {
          if (!answerMap[answer.questionId]) {
            answerMap[answer.questionId] = [];
          }
          answerMap[answer.questionId].push(answer);
        });
        setAnswers(answerMap);

        const commentMap = {};
        data.answers.forEach((answer) => {
          commentMap[answer.id] = [];
        });
        setComments(commentMap);

        setUsers(data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }, []);

  const handleReadMore = (questionId) => {
    setExpandedAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Kiểm tra nếu questions có giá trị và là một mảng trước khi gọi slice
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = Array.isArray(questions)
    ? questions.slice(indexOfFirstQuestion, indexOfLastQuestion)
    : [];

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getUsername = (userId) => {
    if (loading) return "Loading...";
    const user = users.find((user) => user.id === userId);
    return user ? user.username : "Unknown User";
  };

  return (
    <div>
      {loading ? (
        <div>Loading data...</div>
      ) : (
        currentQuestions.map((question, index) => (
          <Card key={index} className="mb-3">
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
                  <Button
                    variant="link"
                    className="p-0 mt-2"
                    onClick={() => handleReadMore(question.id)}
                  >
                    {expandedAnswers[question.id] ? "Show less" : "Read more"}
                  </Button>

                  {expandedAnswers[question.id] && answers[question.id] && (
                    <div className="mt-3">
                      <h5>Answers:</h5>
                      {answers[question.id].map((answer, index) => (
                        <Card key={index} className="mb-3">
                          <Card.Body>
                            <Card.Text>{answer.content}</Card.Text>
                            <p className="text-muted">
                              Answered by {getUsername(answer.userId)} on{" "}
                              {answer.createdDate}
                            </p>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}

      <div className="mt-3">
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant="secondary"
            className="me-2"
            onClick={() => handlePageClick(number)}
            active={number === currentPage}
          >
            {number}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
