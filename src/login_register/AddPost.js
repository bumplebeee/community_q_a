import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./AddPost.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddPost = () => {
  const [tags, setTags] = useState([]); // State to store tags
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [userId, setUserId] = useState(null); // State to store userId
  const navigate = useNavigate(); // Hook to navigate

  // Fetch tags from database.json
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/database.json"); // Accessing file in public folder
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await response.json();
        setTags(data.tags); // Assuming your tags are under "tags" in JSON
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();

    // Get userId from localStorage if it's stored
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be logged in to create a post.");
      return;
    }

    const newPost = {
      title: formData.title,
      content: formData.content,
      tags: [parseInt(formData.tags)], // Assuming tags are stored as ID (numbers) in the JSON
      userId: userId, // Attach userId here
      createdDate: new Date().toISOString().split("T")[0], // Getting current date in yyyy-mm-dd format
    };

    // Simulate saving data by making a POST request to the API
    try {
      const response = await fetch("http://localhost:9999/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const result = await response.json();
      console.log("Post created:", result);
      alert("Question created successfully!");

      // Redirect to /home after successful post creation
      navigate("/home");

      // Reset form
      setFormData({
        title: "",
        content: "",
        tags: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Create Question</h1>
          <form onSubmit={handleSubmit}>
            {/* Title Field */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Question Title <span className="require">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter your question title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Content Field */}
            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Question Content <span className="require">*</span>
              </label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                rows="5"
                placeholder="Enter detailed content of your question"
                value={formData.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Tags Field */}
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

            {/* Submit and Cancel Buttons */}
            <div className="form-group text-center mt-4">
              <button type="submit" className="btn btn-primary mx-2">
                Create
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-2"
                onClick={() =>
                  setFormData({ title: "", content: "", tags: "" })
                }
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

export default AddPost;
