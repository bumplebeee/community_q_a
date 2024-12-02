import React, { useState, useEffect } from "react";
import "./AddPost.css"; // Ensure your styles are imported
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const AddPost = () => {
  const [tags, setTags] = useState([]); // State to store tags
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

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
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate saving data
    console.log("Form submitted with data:", formData);
    alert("Question created successfully!");

    // Reset form
    setFormData({
      title: "",
      content: "",
      tags: "",
    });
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
                  <option key={tag.id} value={tag.name}>
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
