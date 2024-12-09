import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditPost = () => {
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [userId, setUserId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/database.json");
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await response.json();
        setTags(data.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert("You must be logged in to edit a post.");
      navigate("/login");
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:9999/questions/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        const data = await response.json();
        setFormData({
          title: data.title,
          content: data.content,
          tags: data.tags[0],
        });
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    if (id) fetchPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be logged in to edit a post.");
      navigate("/login");
      return;
    }

    const updatedPost = {
      title: formData.title,
      content: formData.content,
      tags: [parseInt(formData.tags)],
      userId: userId,
      updatedDate: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch(`http://localhost:9999/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const result = await response.json();
      console.log("Post updated:", result);
      alert("Post updated successfully!");

      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        navigate("/my-post");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        border: "1px solid black",
        padding: "20px",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Edit Question</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Question Title <span className="require">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Question Content <span className="require">*</span>
              </label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                rows="5"
                value={formData.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="tags" className="form-label">
                Tags
              </label>
              <select
                className="form-control"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              >
                <option value="">Select a tag</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group text-center mt-4">
              <button type="submit" className="btn btn-primary mx-2">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-2"
                onClick={() => navigate("/my-post")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
