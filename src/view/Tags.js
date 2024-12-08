import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";

function Tags() {
    const [tags, setTags] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/database.json");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setTags(data.tags);
                setQuestions(data.questions);
            } catch (error) {
                console.error("Error", error);
            }
        }

        fetchData();
    }, []);

    // Lọc các câu hỏi theo tag
    const filteredQuestions = selectedTag
        ? questions.filter((question) =>
              question.tags.includes(Number(selectedTag))
          )
        : questions;

    return (
        <Container>
            <h2 className="mb-4">All Tags</h2>
            <Row className="mb-4">
                {tags.map((tag) => (
                    <Col key={tag.id} md={2}>
                        <Button
                            variant={
                                selectedTag === tag.id ? "success" : "primary"
                            }
                            onClick={() => {
                                setSelectedTag(tag.id);
                            }}
                            style={{ width: "100%" }}
                        >
                            {tag.name}
                        </Button>
                    </Col>
                ))}
                <Col md={2}>
                    <Button
                        variant="secondary"
                        onClick={() => setSelectedTag(null)}
                        style={{ width: "100%" }}
                    >
                        Show All
                    </Button>
                </Col>
            </Row>

            <h3>
                {selectedTag
                    ? `Questions related to: ${
                          tags.find((tag) => tag.id === selectedTag)?.name
                      }`
                    : "All Questions"}
            </h3>

            {filteredQuestions.length > 0 ? (
                <Row>
                    {filteredQuestions.map((question) => (
                        <Col key={question.id} md={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{question.title}</Card.Title>
                                    <Card.Text>{question.content}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>No questions for this tag.</p>
            )}
        </Container>
    );
}

export default Tags;
