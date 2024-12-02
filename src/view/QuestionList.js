import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Badge, Form } from "react-bootstrap";

function QuestionList({ user }) {
  // Nhận user từ props
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Store answers for each question
  const [users, setUsers] = useState([]); // Store users from database
  const [comments, setComments] = useState({}); // Store comments for each answer
  const [expandedAnswers, setExpandedAnswers] = useState({}); // Track which answers are expanded
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [loading, setLoading] = useState(true); // State to handle loading
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

        // Prepare comments for each answer
        const commentMap = {};
        data.answers.forEach((answer) => {
          commentMap[answer.id] = []; // Initialize empty comment array for each answer
        });
        setComments(commentMap); // Store all comments in state

        // Store users
        setUsers(data.users); // Store all users in state
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false); // Handle loading state in case of error
      });
  }, []);

  // Handle the "Read more" functionality
  const handleReadMore = (questionId) => {
    setExpandedAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId], // Toggle expanded state
    }));
  };

  // Handle comment submission
  const handleCommentSubmit = (answerId, commentText) => {
    if (!commentText.trim()) return; // Prevent empty comments

    if (!user) {
      alert("Please log in to comment!"); // If user is not logged in, show alert
      return;
    }

    const newComment = {
      userId: user.id, // Use the logged-in user's id
      content: commentText,
      createdDate: new Date().toISOString(), // Get the current date and time
    };

    setComments((prev) => {
      const updatedComments = { ...prev };
      if (!updatedComments[answerId]) {
        updatedComments[answerId] = [];
      }
      updatedComments[answerId].push(newComment);
      return updatedComments;
    });
  };

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Handle page number click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Create page numbers for pagination
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Function to get username by userId
  const getUsername = (userId) => {
    if (loading) return "Loading..."; // Show loading message if users are still loading
    const user = users.find((user) => user.id === userId);
    return user ? user.username : "Unknown User"; // Return username or a default value if user is not found
  };

  return (
    <div>
      {loading ? (
        <div>Loading data...</div> // Display a loading message while data is being fetched
      ) : (
        currentQuestions.map((question, index) => (
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
                      <Badge bg="secondary" key={index} className="me-1">
                        {tag}
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

                  {/* Display answers if expanded */}
                  {expandedAnswers[question.id] && answers[question.id] && (
                    <div className="mt-3">
                      <h5>Answers:</h5>
                      {answers[question.id].map((answer, index) => (
                        <Card key={index} className="mb-3">
                          <Card.Body>
                            <Card.Text>{answer.content}</Card.Text>
                            {/* Display the username from users */}
                            <p className="text-muted">
                              Answered by {getUsername(answer.userId)} on{" "}
                              {answer.createdDate}
                            </p>

                            {/* Comment section */}
                            <h5>Comments:</h5>
                            {comments[answer.id]?.map((comment, index) => (
                              <Card key={index} className="mb-3">
                                <Card.Body>
                                  <p>{comment.content}</p>
                                  <p className="text-muted">
                                    Commented by {getUsername(comment.userId)}{" "}
                                    on {comment.createdDate}
                                  </p>
                                </Card.Body>
                              </Card>
                            ))}

                            {/* Comment input form */}
                            <Form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const commentText = e.target.comment.value;
                                handleCommentSubmit(answer.id, commentText);
                                e.target.comment.value = ""; // Reset input after submit
                              }}
                            >
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  placeholder="Add a comment"
                                  name="comment"
                                />
                              </Form.Group>
                              <Button
                                variant="primary"
                                type="submit"
                                className="mt-2"
                              >
                                Submit Comment
                              </Button>
                            </Form>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}

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
