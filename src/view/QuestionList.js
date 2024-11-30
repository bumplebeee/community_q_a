import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";

function QuestionList() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); // Store answers for each question
    const [expandedAnswers, setExpandedAnswers] = useState({}); // Track which answers are expanded
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const questionsPerPage = 2; // Questions per page

    useEffect(() => {
        // Fetch data only once during component mount
        fetch("/database.json")
            .then((response) => response.json())
            .then((data) => {
                // Update questions and answers
                const questionList = data.questions.map((question) => ({
                    ...question,
                    answers: [], // Empty initially, answers will be filled on "Read more"
                }));
                setQuestions(questionList);

                // Prepare answers for each question
                const answerMap = {};
                data.answers.forEach((answer) => {
                    if (!answerMap[answer.questionId]) {
                        answerMap[answer.questionId] = [];
                    }
                    answerMap[answer.questionId].push(answer);
                });
                setAnswers(answerMap); // Store all answers in state
            })
            .catch((error) => console.error("Error loading data:", error));
    }, []);

    // Handle the "Read more" functionality
    const handleReadMore = (questionId) => {
        setExpandedAnswers((prev) => ({
            ...prev,
            [questionId]: !prev[questionId], // Toggle expanded state
        }));
    };

    // Pagination logic
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    // Handle page number click
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Create page numbers for pagination
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            {currentQuestions.map((question, index) => (
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
                                        <Badge
                                            bg="secondary"
                                            key={index}
                                            className="me-1"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <Button
                                    variant="link"
                                    className="p-0 mt-2"
                                    onClick={() => handleReadMore(question.id)}
                                >
                                    {expandedAnswers[question.id]
                                        ? "Show less"
                                        : "Read more"}
                                </Button>

                                {/* Display answers if expanded */}
                                {expandedAnswers[question.id] && answers[question.id] && (
                                    <div className="mt-3">
                                        <h5>Answers:</h5>
                                        {answers[question.id].map((answer, index) => (
                                            <Card key={index} className="mb-3">
                                                <Card.Body>
                                                    <Card.Text>{answer.content}</Card.Text>
                                                    <p className="text-muted">
                                                        Answered by user {answer.userId} on {answer.createdDate}
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
            ))}

            {/* Pagination buttons */}
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
