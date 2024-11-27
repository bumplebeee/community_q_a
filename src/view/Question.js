import React from "react";
import { Container } from "react-bootstrap";
import QuestionList from "./QuestionList";

function Questions() {
    return (
        <Container>
            <h2 className="mb-4">All Questions</h2>
            <QuestionList />
        </Container>
    );
}

export default Questions;
