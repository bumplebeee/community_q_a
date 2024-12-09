import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; // Import các icon

function QuestionList({ questions = [] }) {
  const [answers, setAnswers] = useState({});
  const [users, setUsers] = useState([]);
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [tagsMap, setTagsMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [newAnswerMap, setNewAnswerMap] = useState({});
  const [user, setUser] = useState(null);
  const [editAnswerMap, setEditAnswerMap] = useState({});

  useEffect(() => {
    // Lấy thông tin người dùng đăng nhập từ localStorage
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get("/database.json")
        .then((response) => {
          const data = response.data;
          const loggedInUser = data.users.find((user) => user.id === userId);
          setUser(loggedInUser);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  useEffect(() => {
    // Lấy dữ liệu câu hỏi và câu trả lời
    setLoading(true);

    axios //tôi dùng axios cho nó xịn(Nguyên đẹp trai)
      .get("/database.json")
      .then((response) => {
        const data = response.data;

        const answerMap = {};
        data.answers.forEach((answer) => {
          if (!answerMap[answer.questionId]) {
            answerMap[answer.questionId] = [];
          }
          answerMap[answer.questionId].push(answer);
        });
        setAnswers(answerMap);
        setUsers(data.users);
        const map = {};
        data.tags.forEach((tag) => {
          map[tag.id] = tag.name;
        });
        setTagsMap(map);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }, []);

  const handleReadMore = (questionId) => {
    setExpandedAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const indexOfLastQuestion = currentPage * 2;
  const indexOfFirstQuestion = indexOfLastQuestion - 2;
  const currentQuestions = Array.isArray(questions)
    ? questions.slice(indexOfFirstQuestion, indexOfLastQuestion)
    : [];

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(questions.length / 2);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleAnswerSubmit = async (e, questionId) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("You need to log in to post a reply.");
      return;
    }

    const commentContent = newAnswerMap[questionId]?.trim();
    if (!commentContent) {
      alert("Comments cannot be left blank");
      return;
    }

    const newAnswerObj = {
      id: Date.now().toString(),
      questionId: questionId,
      content: commentContent,
      userId: user.id,
      createdDate: new Date().toLocaleString(),
    };

    try {
      if (users.length === 0) {
        alert("User data has not been loaded yet. Please try again later.");
        return;
      }

      // dùng axios để post cho nó nhàn
      await axios.post("http://localhost:9999/answers", newAnswerObj);

      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: [...(prevAnswers[questionId] || []), newAnswerObj],
      }));

      setNewAnswerMap((prev) => ({ ...prev, [questionId]: "" }));
      alert("Reply sent successfully!");
    } catch (error) {
      console.error("Error posting answer:", error);
      alert("An error occurred while submitting your reply.");
    }
  };

  const handleEditAnswer = (answerId, questionId) => {
    const answerToEdit = answers[questionId].find((ans) => ans.id === answerId);
    setEditAnswerMap((prev) => ({
      ...prev,
      [answerId]: answerToEdit.content,
    }));
  };

  const handleSaveEditAnswer = async (answerId, questionId) => {
    const updatedAnswer = editAnswerMap[answerId]?.trim();
    if (!updatedAnswer) {
      alert("Answer cannot be left blank!");
      return;
    }

    const answerToEdit = answers[questionId].find((ans) => ans.id === answerId);
    if (!answerToEdit) {
      console.error("No answer found to edit");
      return;
    }

    const updatedAnswerObj = {
      id: answerToEdit.id,
      questionId: answerToEdit.questionId,
      content: updatedAnswer,
      userId: answerToEdit.userId,
      createdDate: answerToEdit.createdDate,
    };

    try {
      await axios.put(
        `http://localhost:9999/answers/${answerId}`,
        updatedAnswerObj
      );

      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: prevAnswers[questionId].map((answer) =>
          answer.id === answerId
            ? { ...answer, content: updatedAnswer }
            : answer
        ),
      }));

      setEditAnswerMap((prev) => ({ ...prev, [answerId]: "" }));
      alert("The answer has been edited successfully!");
    } catch (error) {
      console.error("Error editing answer:", error);
      alert("An error occurred while editing the answer.");
    }
  };

  const handleDeleteAnswer = async (answerId, questionId) => {
    try {
      await axios.delete(`http://localhost:9999/answers/${answerId}`);
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: prevAnswers[questionId].filter(
          (answer) => answer.id !== answerId
        ),
      }));
      alert("The answer has been deleted!");
    } catch (error) {
      console.error("Error deleting answer:", error);
      alert("An error occurred while deleting the reply.");
    }
  };
  // Kiểm tra nếu userId không hợp lệ
  const getUsername = (userId) => {
    if (loading || !userId) return "Loading...";
    const user = users.find((user) => user.id === userId);
    return user ? user.username : "Unknown User";
  };

  return (
    <div>
      {loading ? (
        <div>Loading data...</div>
      ) : (
        currentQuestions.map((question, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Row>
                <Col md={10}>
                  <Card.Title>{question.title}</Card.Title>
                  <Card.Text>{question.content}</Card.Text>
                  <div>
                    {question.tags.map((tagId, index) => (
                      <Badge bg="secondary" key={index} className="me-1">
                        {tagsMap[tagId] || "Unknown Tag"}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="link"
                    className="p-0 mt-2"
                    onClick={() => handleReadMore(question.id)}
                  >
                    {expandedAnswers[question.id] ? "Show less" : "Read more"}
                  </Button>

                  {expandedAnswers[question.id] && answers[question.id] && (
                    <div className="mt-3">
                      <h5>Answers:</h5>
                      {answers[question.id].map((answer, index) => (
                        <Card key={index} className="mb-3">
                          <Card.Body>
                            {editAnswerMap[answer.id] ? (
                              <div>
                                <textarea
                                  className="form-control"
                                  value={editAnswerMap[answer.id]}
                                  onChange={(e) =>
                                    setEditAnswerMap((prev) => ({
                                      ...prev,
                                      [answer.id]: e.target.value,
                                    }))
                                  }
                                  rows="3"
                                />
                                <Button
                                  variant="primary"
                                  className="mt-2"
                                  onClick={() =>
                                    handleSaveEditAnswer(answer.id, question.id)
                                  }
                                >
                                  Save Edit
                                </Button>
                              </div>
                            ) : (
                              <Card.Text>{answer.content}</Card.Text>
                            )}
                            <p className="text-muted">
                              Answered by{" "}
                              <strong style={{ color: "black" }}>
                                {getUsername(answer.userId)}
                              </strong>{" "}
                              on {answer.createdDate}
                            </p>
                            {user && user.id === answer.userId && (
                              <div>
                                <Button
                                  variant="link"
                                  onClick={() =>
                                    handleEditAnswer(answer.id, question.id)
                                  }
                                >
                                  <AiOutlineEdit />
                                </Button>
                                <Button
                                  variant="link"
                                  onClick={() =>
                                    handleDeleteAnswer(answer.id, question.id)
                                  }
                                >
                                  <AiOutlineDelete />
                                </Button>
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  )}

                  <div className="mt-3">
                    <h4>New Answer:</h4>
                    <textarea
                      className="form-control"
                      value={newAnswerMap[question.id] || ""}
                      onChange={(e) =>
                        setNewAnswerMap((prev) => ({
                          ...prev,
                          [question.id]: e.target.value,
                        }))
                      }
                      rows="3"
                      placeholder="Your answer..."
                    />
                    <Button
                      variant="primary"
                      className="mt-2"
                      onClick={(e) => handleAnswerSubmit(e, question.id)}
                    >
                      Submit Answer
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}

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
