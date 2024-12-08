import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";

function QuestionDetail({ questions, answers, users }) {
    const { id } = useParams(); // Lấy id câu hỏi từ URL
    const [question, setQuestion] = useState(null);
    const [expandedAnswers, setExpandedAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Tìm câu hỏi theo id
        const questionDetail = questions.find((q) => q.id === id);
        setQuestion(questionDetail);
        setLoading(false);
    }, [id, questions]);

    // Lấy tên người dùng từ userId
    const getUsername = (userId) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.username : "Unknown User";
    };

    const handleReadMore = (questionId) => {
        setExpandedAnswers((prev) => ({
            ...prev,
            [questionId]: !prev[questionId],
        }));
    };

    if (loading) return <div>Loading question...</div>;

    if (!question) return <div>Question not found</div>;

    // Lọc các câu trả lời của câu hỏi này
    const questionAnswers = answers.filter(
        (answer) => answer.questionId === parseInt(id)
    );

    return (
        <div>
            <Card className="mb-3">
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
                                    <Badge
                                        bg="secondary"
                                        key={index}
                                        className="me-1"
                                    >
                                        {tag.name}
                                    </Badge>
                                ))}
                            </div>

                            {/* Nút Read More */}
                            <Button
                                variant="link"
                                className="p-0 mt-2"
                                onClick={() => handleReadMore(question.id)}
                            >
                                {expandedAnswers[question.id]
                                    ? "Show less"
                                    : "Read more"}
                            </Button>

                            {/* Hiển thị câu trả lời khi Read More được nhấn */}
                            {expandedAnswers[question.id] &&
                                questionAnswers.length > 0 && (
                                    <div className="mt-3">
                                        <h5>Answers:</h5>
                                        {questionAnswers.map(
                                            (answer, index) => (
                                                <Card
                                                    key={answer.id}
                                                    className="mb-3"
                                                >
                                                    <Card.Body>
                                                        <Card.Text>
                                                            {answer.content}
                                                        </Card.Text>
                                                        <p className="text-muted">
                                                            Answered by{" "}
                                                            {getUsername(
                                                                answer.userId
                                                            )}{" "}
                                                            on{" "}
                                                            {new Date(
                                                                answer.createdDate
                                                            ).toLocaleDateString()}
                                                        </p>
                                                    </Card.Body>
                                                </Card>
                                            )
                                        )}
                                    </div>
                                )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Button to go back */}
            <Link to="/questions">
                <Button variant="secondary">Back to Questions</Button>
            </Link>
        </div>
    );
}

export default QuestionDetail;
