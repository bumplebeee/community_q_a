import React from "react";
import { Card, Button } from "react-bootstrap";

const questions = [
    {
        title: "How to use React with Bootstrap?",
        description: "I am new to React...",
        votes: 10,
        answers: 5,
        views: 100,
    },
    {
        title: "JavaScript async functions",
        description: "Can someone explain...",
        votes: 15,
        answers: 3,
        views: 200,
    },
    {
        title: "CSS Flexbox layout issues",
        description: "I am facing issues...",
        votes: 5,
        answers: 1,
        views: 50,
    },
    // Add more questions as needed
];

function QuestionList() {
    return (
        <div>
            {questions.map((question, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Card.Title>{question.title}</Card.Title>
                                <Card.Text>{question.description}</Card.Text>
                                <Button variant="link">Read more</Button>
                            </div>
                            <div className="text-end">
                                <p>{question.votes} votes</p>
                                <p>{question.answers} answers</p>
                                <p>{question.views} views</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default QuestionList;
