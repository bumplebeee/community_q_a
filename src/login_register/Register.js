import React, { useState } from "react";
import "./util.css";
import "./main.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const validatePassword = (password) => {
    const hasUppercase = /(?=.*[A-Z])/.test(password); // Kiểm tra ký tự viết hoa
    const hasSpecialChar = /(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password); // Kiểm tra ký tự đặc biệt
    return hasUppercase && hasSpecialChar;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage("All fields are required.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        "Password must contain at least 1 uppercase letter and 1 special character."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:9999/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          passwordHash: password, // Lưu mật khẩu dưới dạng chuỗi đơn giản
          profilePicture: "https://example.com/default-profile.jpg", // Ảnh mặc định
          joinDate: new Date().toISOString().split("T")[0], // Ngày hiện tại
        }),
      });

      if (response.ok) {
        setMessage("Registration successful. Please log in!");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-30 p-b-50">
          <span
            className="login100-form-title p-b-41"
            style={{ fontWeight: "bold", fontFamily: "Ubuntu, sans-serif" }}
          >
            Sign Up
          </span>
          <form
            className="login100-form validate-form p-b-33 p-t-5"
            onSubmit={handleRegister}
          >
            <div
              className="wrap-input100 validate-input"
              data-validate="Enter username"
            >
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="User name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ fontFamily: "Ubuntu, sans-serif" }}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xe82a;"
              ></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter email"
            >
              <input
                className="input100"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontFamily: "Ubuntu, sans-serif" }}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xe818;"
              ></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ fontFamily: "Ubuntu, sans-serif" }}
              />
              <span
                className="focus-input100"
                data-placeholder="&#xe80f;"
              ></span>
            </div>

            {message && (
              <div
                style={{
                  color: message.includes("successful") ? "green" : "red",
                  fontFamily: "Ubuntu, sans-serif",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                {message}
              </div>
            )}

            <div className="container-login100-form-btn m-t-32">
              <button
                type="submit"
                className="login100-form-btn"
                style={{ fontFamily: "Ubuntu, sans-serif" }}
              >
                Sign Up
              </button>
            </div>

            <div
              className="text-center p-t-20"
              style={{ fontFamily: "Ubuntu, sans-serif" }}
            >
              <p>
                Already have an account?{" "}
                <a
                  href="/"
                  className="txt1"
                  style={{ fontFamily: "Ubuntu, sans-serif", color: "#d41872" }}
                >
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
