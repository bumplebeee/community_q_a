import React from "react";
import { Container } from "react-bootstrap";
import QuestionList from "./QuestionList";

function Home() {
    return (
        <Container>
            <h2 className="mb-4">Top Questions</h2>
            <QuestionList />
        </Container>
    );
}

export default Home;