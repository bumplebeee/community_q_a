import React from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";

const questions = [
    {
        title: "How to use React with Bootstrap?",
        description: "I am new to React and Bootstrap...",
        votes: 10,
        answers: 5,
        views: 100,
        tags: ["React", "Bootstrap"],
    },
    {
        title: "JavaScript async functions",
        description: "Can someone explain async functions...",
        votes: 15,
        answers: 3,
        views: 200,
        tags: ["JavaScript", "Async"],
    },
    {
        title: "CSS Flexbox layout issues",
        description: "I am facing issues with Flexbox layout...",
        votes: 5,
        answers: 1,
        views: 50,
        tags: ["CSS", "Flexbox"],
    },
];

function QuestionList() {
    return (
        <div>
            {questions.map((question, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        <Row>
                            <Col md={2} className="text-center">
                                <p>
                                    <strong>{question.votes}</strong> votes
                                </p>
                                <p>
                                    <strong>{question.answers}</strong> answers
                                </p>
                                <p>
                                    <strong>{question.views}</strong> views
                                </p>
                            </Col>
                            <Col md={10}>
                                <Card.Title>{question.title}</Card.Title>
                                <Card.Text>{question.description}</Card.Text>
                                <div>
                                    {question.tags.map((tag, index) => (
                                        <Badge
                                            bg="secondary"
                                            key={index}
                                            className="me-1"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <Button variant="link" className="p-0 mt-2">
                                    Read more
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default QuestionList;
