import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import QuestionList from "./QuestionList";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dữ liệu câu hỏi từ JSON hoặc API
  useEffect(() => {
    fetch("/database.json") // giả sử file json của bạn chứa dữ liệu câu hỏi
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions); // Lưu câu hỏi vào state
        setLoading(false); // Đánh dấu là đã tải xong
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false); // Đánh dấu là có lỗi khi tải dữ liệu
      });
  }, []);

  return (
    <Container>
      <h2 className="mb-4">All Questions</h2>
      {loading ? (
        <div>Loading questions...</div> // Hiển thị khi đang tải dữ liệu
      ) : (
        <QuestionList questions={questions} />
      )}
    </Container>
  );
}

export default Questions;
