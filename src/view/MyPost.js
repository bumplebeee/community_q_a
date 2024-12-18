import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MyPost() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null); // Lưu trữ userId
  const navigate = useNavigate();

  // Lấy userId từ localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    // Fetch danh sách bài viết từ server
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:9999/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  if (!Array.isArray(posts)) {
    return <p>No questions available</p>;
  }

  const userQuestions = posts.filter((question) => question.userId === userId);

  const handleEdit = (id) => {
    navigate(`/editPost/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:9999/questions/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        // Cập nhật lại danh sách bài viết sau khi xóa
        setPosts(posts.filter((question) => question.id !== id));
        alert("Post deleted successfully!");
        navigate("/home"); // Điều hướng về trang home sau khi xóa
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post.");
      }
    }
  };

  return (
    <div>
      <h2>Your Questions</h2>
      {userQuestions.length === 0 ? (
        <p>You haven't posted any questions yet.</p>
      ) : (
        userQuestions.map((question) => (
          <Card key={question.id} className="mb-3">
            <Card.Body>
              <Row>
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
                </Col>
                <Col md={2} className="text-end">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(question.id)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(question.id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default MyPost;
