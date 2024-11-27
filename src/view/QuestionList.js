import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";

function QuestionList() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); // Trạng thái lưu câu trả lời
    const [expandedAnswers, setExpandedAnswers] = useState({}); // Trạng thái theo dõi câu trả lời đã mở hay chưa
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const questionsPerPage = 2; // Số câu hỏi mỗi trang

    useEffect(() => {
        fetch("/database.json")
            .then((response) => response.json())
            .then((data) => {
                const questionList = data.questions.map((question) => ({
                    ...question,
                    answers: [], // Mảng câu trả lời, sẽ được cập nhật khi nhấn "Read more"
                }));
                setQuestions(questionList);
            })
            .catch((error) => console.error("Error loading data:", error));
    }, []);

    // Hàm xử lý khi nhấn "Read more"
    const handleReadMore = (questionId) => {
        // Nếu câu trả lời đã được mở, sẽ thu gọn lại
        if (expandedAnswers[questionId]) {
            setExpandedAnswers((prev) => ({ ...prev, [questionId]: false }));
        } else {
            // Nếu câu trả lời chưa mở, sẽ tải và hiển thị
            fetch("/database.json")
                .then((response) => response.json())
                .then((data) => {
                    const questionAnswers = data.answers.filter(
                        (answer) => answer.questionId === questionId
                    );
                    setAnswers((prevAnswers) => ({
                        ...prevAnswers,
                        [questionId]: questionAnswers,
                    }));
                    setExpandedAnswers((prev) => ({
                        ...prev,
                        [questionId]: true,
                    }));
                })
                .catch((error) =>
                    console.error("Error loading answers:", error)
                );
        }
    };

    // Tính toán câu hỏi cần hiển thị cho trang hiện tại
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(
        indexOfFirstQuestion,
        indexOfLastQuestion
    );

    // Xử lý khi người dùng nhấn vào một số trang
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Tạo dãy số trang
    const totalPages = Math.ceil(questions.length / questionsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

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

                                {/* Hiển thị câu trả lời nếu có */}
                                {expandedAnswers[question.id] &&
                                    answers[question.id] &&
                                    answers[question.id].length > 0 && (
                                        <div className="mt-3">
                                            <h5>Answers:</h5>
                                            {answers[question.id].map(
                                                (answer, index) => (
                                                    <Card
                                                        key={index}
                                                        className="mb-3"
                                                    >
                                                        <Card.Body>
                                                            <Card.Text>
                                                                {answer.content}
                                                            </Card.Text>
                                                            <p className="text-muted">
                                                                Answered by user{" "}
                                                                {answer.userId}{" "}
                                                                on{" "}
                                                                {
                                                                    answer.createdDate
                                                                }
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
            ))}

            {/* Phân trang bằng các số trang */}
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
