import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";

function Tags() {
    const [tags, setTags] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/database.json"); // Kiểm tra đường dẫn file đúng
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                setTags(data.tags); // Giả sử 'data' chứa 'tags'
                setQuestions(data.questions); // Giả sử 'data' chứa 'questions'
            } catch (error) {
                console.error("Có lỗi khi lấy dữ liệu:", error);
            }
        }

        fetchData();
    }, []); // Chạy một lần khi component được mount

    // Lọc câu hỏi theo tag đã chọn
    const filteredQuestions = selectedTag
        ? questions.filter(
              (question) => question.tags && question.tags.includes(selectedTag)
          )
        : questions;

    return (
        <Container>
            <h2 className="mb-4">All Tags</h2>
            <Row className="mb-4">
                {tags.map((tag) => (
                    <Col key={tag.id} md={2}>
                        <Button
                            variant="primary"
                            onClick={() => setSelectedTag(tag.id)} // Chọn tag khi nhấn
                            style={{ width: "100%" }}
                        >
                            {tag.name}
                        </Button>
                    </Col>
                ))}
            </Row>

            {selectedTag && (
                <div>
                    <h3>
                        Related to tag:{" "}
                        {tags.find((tag) => tag.id === selectedTag)?.name}
                    </h3>

                    {filteredQuestions.length > 0 ? (
                        <Row>
                            {filteredQuestions.map((question) => (
                                <Col key={question.id} md={4} className="mb-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                {question.title}
                                            </Card.Title>
                                            <Card.Text>
                                                {question.content}
                                            </Card.Text>

                                            {question.answers &&
                                                question.answers.length > 0 && (
                                                    <div>
                                                        <h5>Answers:</h5>
                                                        {question.answers.map(
                                                            (answer) => (
                                                                <Card
                                                                    key={
                                                                        answer.id
                                                                    }
                                                                    className="mb-2"
                                                                >
                                                                    <Card.Body>
                                                                        {
                                                                            answer.content
                                                                        }
                                                                    </Card.Body>
                                                                </Card>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p>No questions available for this tag.</p>
                    )}
                </div>
            )}
        </Container>
    );
}

export default Tags;
