import React, { useState, useEffect } from "react";
import { Container, Form, FormControl, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom"; // Sử dụng Link để điều hướng
import QuestionList from "./QuestionList";

function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // Lưu từ khóa tìm kiếm
  const [questions, setQuestions] = useState([]); // Danh sách câu hỏi
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Câu hỏi đã lọc
  const [loading, setLoading] = useState(true); // Trạng thái loading

  // Lấy dữ liệu câu hỏi từ file JSON hoặc API
  useEffect(() => {
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        setFilteredQuestions(data.questions); // Mặc định hiển thị tất cả câu hỏi
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Hàm để xử lý việc tìm kiếm câu hỏi
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredQuestions(questions); // Nếu không có từ khóa thì hiển thị tất cả câu hỏi
    } else {
      const filtered = questions.filter(
        (question) =>
          question.title.toLowerCase().includes(query.toLowerCase()) ||
          question.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredQuestions(filtered); // Lọc câu hỏi dựa trên từ khóa
    }
  };

  return (
    <Container>
      <h2 className="mb-4">All Questions</h2>
      <Form className="d-flex mb-4">
        <FormControl
          type="search"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ backgroundColor: "#e6f7ff", borderColor: "#007bff" }}
        />
      </Form>

      {/* Gợi ý câu hỏi */}
      {searchQuery && filteredQuestions.length > 0 && (
        <ListGroup className="mb-4">
          {filteredQuestions.map((question, index) => (
            <ListGroup.Item key={index} action>
              <Link
                to={`/question/${question.id}`}
                className="text-decoration-none"
              >
                {question.title}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {loading ? (
        <div>Loading questions...</div>
      ) : (
        <QuestionList questions={filteredQuestions} />
      )}
    </Container>
  );
}

export default Home;
